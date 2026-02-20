# SNIP — URL Shortener Frontend

Frontend untuk Go URL Shortener, dibangun dengan **React + Vite + Tailwind CSS**.

## Stack

- ⚡ Vite 5
- ⚛️ React 18
- 🎨 Tailwind CSS 3
- 🔠 Syne + JetBrains Mono (Google Fonts)

## Struktur Project

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── HeroBadge.jsx       # Pill badge di hero section
│   ├── AlertBox.jsx        # Error/success alert
│   ├── ResultBox.jsx       # Hasil short link setelah shorten
│   ├── HistoryList.jsx     # Daftar link yang sudah dibuat
│   ├── AnalyticsResult.jsx # Tampilan stats & detail analytics
│   ├── ShortenView.jsx     # Halaman utama shorten
│   ├── AnalyticsView.jsx   # Halaman analytics
│   └── Toast.jsx           # Notifikasi toast
├── hooks/
│   └── useToast.js         # Custom hook untuk toast notification
├── utils/
│   ├── api.js              # Semua fetch ke backend (POST /shorten, GET /analytics/:code)
│   └── history.js          # Manajemen history via localStorage
├── App.jsx                 # Root component + state routing
├── main.jsx                # Entry point
└── index.css               # Global styles + Tailwind directives
```

## Setup & Menjalankan

### 1. Install dependencies

```bash
npm install
```

### 2. Pastikan backend berjalan

```bash
# Di folder backend Go kamu
go run ./cmd
# Backend harus berjalan di http://localhost:8080
```

### 3. Jalankan frontend

```bash
npm run dev
# Buka http://localhost:5173
```

> Vite sudah dikonfigurasi untuk proxy `/shorten` dan `/analytics` ke `http://localhost:8080`,
> sehingga tidak ada CORS issue saat development.

### 4. Build untuk production

```bash
npm run build
# Output ada di folder dist/
```

## API yang Digunakan

| Method | Endpoint           | Deskripsi                    |
|--------|--------------------|------------------------------|
| POST   | `/shorten`         | Membuat short URL baru       |
| GET    | `/:code`           | Redirect ke original URL     |
| GET    | `/analytics/:code` | Mengambil data analytics     |

### Request Body `/shorten`
```json
{ "url": "https://example.com/very-long-url" }
```

### Response `/analytics/:code`
```json
{
  "code": "abc123",
  "short_url": "http://localhost:8080/abc123",
  "original_url": "https://example.com/very-long-url",
  "clicks": 42,
  "unique_clicks": 30,
  "created_at": "2024-01-15T10:30:00Z",
  "last_accessed": "2024-01-20T14:22:00Z"
}
```

> Field naming di-normalize otomatis di `src/utils/api.js` — support beberapa variasi nama field.
