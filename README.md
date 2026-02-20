# ⚡ SNIP — URL Shortener Frontend

A clean, modern frontend for the SNIP URL Shortener service, built with React 18, Vite 5, and Tailwind CSS v4. Features a fresh light-mode design with smooth animations, real-time link analytics, expiration scheduling, and local history tracking.

<br>

## 🌐 Backend Repository
The backend for this project is maintained separately:
- #### Repository: https://github.com/galihaleanda/golang-urlshortener

<br>

## 🛠 Tech Stack
- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **Tailwind CSS v4** — Styling via `@tailwindcss/vite`
- **Plus Jakarta Sans** + **JetBrains Mono** — Typography

<br>

## ✨ Features
- 🔗 Instantly shorten any URL with one click
- ⏰ Set custom expiration date & time via datetime picker
- 📊 Analytics dashboard — clicks, unique visitors, days active
- 🕓 Recent link history saved locally with quick copy & stats
- 📋 One-click copy to clipboard
- 💅 Light mode UI with violet-cyan gradient accent and smooth animations

<br>

## 🔹 Installation
### 1️⃣ Clone Repository
```bash
git clone https://github.com/galihaleandaaa/url-shortener-frontend.git
cd url-shortener-frontend
```
### 2️⃣ Install Dependencies
```bash
npm install
```

<br>

## ⚙️ Configuration
### 1️⃣ Vite Proxy
The frontend proxies API requests to the backend via `vite.config.js` to avoid CORS issues. Make sure the backend is running on `localhost:8080` before starting the dev server.
```js
// vite.config.js
proxy: {
  '/shorten':   'http://localhost:8080',
  '/analytics': 'http://localhost:8080',
}
```

<br>

## ▶️ Running the App
```bash
npm run dev
```
```bash
Frontend will start at
http://localhost:5173
```

> ⚠️ Make sure the Go backend is running on `http://localhost:8080` first.

<br>

## 📁 Project Structure
```
src/
├── components/
│   ├── Header.jsx            # Navigation header
│   ├── ShortenView.jsx       # Main shorten page
│   ├── AnalyticsView.jsx     # Analytics lookup page
│   ├── ResultBox.jsx         # Short link result display
│   ├── HistoryList.jsx       # Recent links list
│   ├── AnalyticsResult.jsx   # Stats cards & detail table
│   ├── AlertBox.jsx          # Error / success alerts
│   ├── HeroBadge.jsx         # Hero section badge
│   └── Toast.jsx             # Copy notification toast
├── hooks/
│   └── useToast.js           # Toast notification hook
├── utils/
│   ├── api.js                # API calls to backend
│   └── history.js            # localStorage history management
├── App.jsx                   # Root component + view routing
└── index.css                 # Global styles & Tailwind theme
```

<br>

## 📡 API Endpoints Used
### 1️⃣ Shorten URL
POST /shorten
Request Body :
```bash
{
  "url": "https://example.com/long-url",
  "expired_at": "2026-02-21T15:00:00Z"
}
```
Response :
```bash
{
  "short_code": "a1B2c3",
  "expires_at": "2026-02-21T15:00:00Z"
}
```
### 2️⃣ Redirect Short URL
GET /:short_code
##### Behavior:
Redirects to the original URL
Returns 410 Gone if link expired
### 3️⃣ Analytics
GET /analytics/:short_code
Response :
```bash
{
  "original_url": "https://example.com/long-url",
  "click_count": 5,
  "created_at": "2026-02-19T14:59:29Z",
  "expires_at": "2026-02-21T15:00:00Z"
}
```

<br>

## 🧪 Example Usage
#### Shorten a URL
```bash
curl -X POST http://localhost:8080/shorten \
-H "Content-Type: application/json" \
-d '{"url": "https://chat.openai.com", "expired_at": "2026-02-22T10:00:00Z"}'
```
#### Visit Short Link
```
http://localhost:8080/a1B2c3
```
#### Check Analytics
```bash
curl http://localhost:8080/analytics/a1B2c3
```

<br>

## 📝 Notes
- `expired_at` is optional — if not set, the link will not expire
- All timestamps use UTC (ISO 8601 format)
- Link history is stored in browser `localStorage` (max 10 recent links)
- Vite proxy handles CORS — no extra backend configuration needed for development
