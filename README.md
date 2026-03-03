# MnmlNote

A minimal, distraction-free note-taking web app built with the MERN stack. Create, read, update, and delete notes through a clean interface with dark/light theme support and server-side rate limiting.

## Features

- 📝 **Create, edit, and delete notes** — full CRUD with real-time feedback via toast notifications
- 🌗 **Dark / Light theme** — toggle between custom-designed themes with system preference detection
- 🚦 **Rate limiting** — per-IP sliding window rate limiting powered by Upstash Redis
- 📱 **Responsive design** — mobile-first layout with a grid that adapts across breakpoints
- ⚡ **Production-ready** — serves the React frontend as static files from Express in production
- 🔒 **Security headers** — X-Content-Type-Options, X-Frame-Options, and XSS protection out of the box
- 🗑️ **Delete confirmation** — modal overlay prevents accidental note deletion

## Tech Stack

- **Frontend** — React 19, React Router 7, Tailwind CSS 4, DaisyUI 5, Axios, Lucide React icons, React Hot Toast
- **Backend** — Node.js, Express 5, Mongoose (MongoDB ODM)
- **Database** — MongoDB Atlas
- **Rate Limiting** — Upstash Redis with `@upstash/ratelimit` (sliding window, 100 req / 60 s)
- **Build Tool** — Vite 7
- **Dev Tooling** — Nodemon, ESLint

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB instance)
- An [Upstash Redis](https://upstash.com/) database (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/amln19/mnml-note.git
cd mnml-note

# Install all dependencies (backend + frontend)
npm run build
```

### Environment Variables

Create a `.env` file inside the `backend/` directory. You can copy the example:

```bash
cp backend/.env.example backend/.env
```

Then fill in your values:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mnml-note
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
NODE_ENV=development
PORT=5001
```

| Variable | Description | Required |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | Yes |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token | Yes |
| `NODE_ENV` | `development` or `production` | No (defaults to `development`) |
| `PORT` | Port for the Express server | No (defaults to `5001`) |

### Running the App

**Development** — starts both backend (Nodemon) and frontend (Vite) concurrently:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies API calls to the backend at `http://localhost:5001`.

**Production** — build the frontend and serve everything from Express:

```bash
npm run build
npm start
```

The app is then available at `http://localhost:5001`.

## Project Structure

```
mnml-note/
├── package.json                  # Root scripts: dev, build, start
├── backend/
│   ├── package.json              # Backend dependencies & scripts
│   ├── .env.example              # Environment variable template
│   └── src/
│       ├── server.js             # Express entry point, middleware, static serving
│       ├── config/
│       │   ├── db.js             # MongoDB connection via Mongoose
│       │   └── upstash.js        # Upstash Redis rate limiter config
│       ├── controllers/
│       │   └── notesController.js  # CRUD handlers for notes
│       ├── middleware/
│       │   └── rateLimiter.js    # Per-IP rate limiting middleware
│       ├── models/
│       │   └── Note.js           # Mongoose schema (title, content, timestamps)
│       └── routes/
│           └── notesRoutes.js    # /api/notes route definitions
└── frontend/
    ├── package.json              # Frontend dependencies & scripts
    ├── index.html                # HTML entry point
    ├── vite.config.js            # Vite + React + Tailwind plugin config
    ├── eslint.config.js          # ESLint flat config
    └── src/
        ├── main.jsx              # React root — BrowserRouter, Toaster
        ├── App.jsx               # Route definitions (/, /create, /note/:id)
        ├── style.css             # Tailwind imports, DaisyUI custom themes
        ├── components/
        │   ├── NavBar.jsx        # Top bar with logo, new note button, theme toggle
        │   ├── NoteCard.jsx      # Note preview card with edit/delete actions
        │   ├── ConfirmDeleteScreen.jsx  # Delete confirmation modal
        │   ├── NotesNotFound.jsx # Empty state placeholder
        │   ├── RateLimitedUI.jsx # Rate limit warning banner
        │   └── ThemeToggle.jsx   # Dark/light mode toggle with localStorage
        ├── lib/
        │   ├── axios.js          # Axios instance with dynamic base URL
        │   └── utils.js          # Date formatting helper
        └── pages/
            ├── HomePage.jsx      # Notes grid with fetch, loading, and error states
            ├── CreateNotePage.jsx    # New note form
            └── NoteDetailsPage.jsx   # Edit/delete existing note
```

## API Endpoints

All routes are prefixed with `/api/notes` and protected by the rate limiter.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notes` | Retrieve all notes (newest first) |
| `GET` | `/api/notes/:id` | Retrieve a single note by ID |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update an existing note |
| `DELETE` | `/api/notes/:id` | Delete a note |

## Deployment

The project is set up for single-server deployment:

1. Set `NODE_ENV=production` in your environment.
2. Run `npm run build` to install dependencies and build the frontend.
3. Run `npm start` to launch Express, which serves the API and the React SPA from `frontend/dist`.

Works out of the box on platforms like [Render](https://render.com), [Railway](https://railway.app), or any Node.js host — just set your environment variables and configure the build/start commands.

## License

This project is licensed under the [MIT License](LICENSE).
