import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document"
import createEmotionServer from "@emotion/server/create-instance"
import theme from "@/lib/theme"
import createEmotionCache from "@/lib/createEmotionCache"
import { ReactElement } from "react";
import type { AppProps } from "next/app"
import type { EmotionCache } from "@emotion/react"


interface MyDocumentProps extends DocumentInitialProps {
  emotionStyleTags: ReactElement[]
}


export default class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<MyDocumentProps> => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp:
        (App: React.ComponentType<AppProps & { emotionCache?: EmotionCache }>) =>
        (props) =>
          <App emotionCache={cache} {...props} />,
    })
  
  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}
