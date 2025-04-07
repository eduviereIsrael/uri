#  Hashtag Sentiment Insights

This project visualizes sentiment trends over time for different hashtags using a clean UI and interactive charts. It showcases dynamic routing, API handling, SWR-based data fetching, responsive design, and performance optimizations in a modern Next.js app.


---

##  Features

###  Dynamic Routing

- **Route**: `/insights/[hashtag]`
- Users can navigate to a specific hashtag page like `/insights/react`, `/insights/uri`, etc.
- Uses `useRouter` to extract the hashtag from the URL and pass it to the data hook.

###  Data Fetching with SWR

- Uses **SWR** to fetch sentiment trend data for the selected hashtag.
- Endpoint: `/api/trends/[hashtag]`
- Mock API returns sample sentiment data for different hashtags.
- Artificial delay (1 second) simulates real-world latency for more realistic loading behavior.

###  Sentiment Chart

- Powered by `@mui/x-charts/LineChart`.
- Displays sentiment trend line for 7 days.
- Shows min/max sentiment markers with red (🔻) and green (🔺) indicators.
- Custom time-formatted x-axis (e.g. "Apr 1").
- Highlights trend direction with 📈 or 📉 emoji based on sentiment change.

###  Performance Optimization

- `React.memo` wraps the chart to avoid unnecessary re-renders.
- `useMemo` used to:
  - Preprocess `xAxisData`, sentiment values.
  - Find and render min/max sentiment markers.
- `useCallback` used in handlers to avoid prop identity changes.

###  Modular Component Design

- `HashtagTrendCard`: Central card component handling loading, error, chart rendering.
- `HashtagSelector`: Lets users switch hashtags.
- `SentimentChart`: Interactive, responsive chart visualization.

###  Loading & Error UX

- **Loading**: Shows spinner or fallback when fetching data.
- **Error**: Displays a message and a **Retry** button when the API returns an error or 404.
- Uses SWR’s `mutate()` to refresh data on retry.

###  Layout and Design

- Layout built with **Material UI** (`@mui/material`) for a polished look.
- Responsive container (`Container`) with padding and typography hierarchy.
- Back to Home button using MUI's `Button` and `Link`.
- Headline and subtext describing the insight purpose.

###  Mobile-First Responsive Design

- Uses `useMediaQuery` to adjust chart height and layout for small screens.
- All components are optimized for different breakpoints.

---

##  Displayed Information

Each hashtag page shows:

-  **Hashtag Title** — e.g. `#uri`
-  **Date Range** — e.g. `Apr 1 - Apr 7, 2025`
-  **Sentiment Line Chart** — Interactive and colored by theme
-  **Min/Max Points** — Visual indicators on the graph
- ⬆ **Trend Direction** — Shows 📈 or 📉 based on sentiment increase/decrease

---

##  Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js** | Fullstack framework |
| **SWR** | React hook for fetching + caching |
| **Material UI (MUI)** | Component library |
| **@mui/x-charts** | Charting library |
| **TypeScript** | Type safety |
| **React.memo/useMemo** | Performance tuning |
| **Dynamic Imports** | Client-side only components with fallbacks |

---

##  Folder Structure Overview

## Time Spent:
5 hours