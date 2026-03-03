# MnmlNote

A minimal MERN stack note-taking app. Notes are stored in MongoDB, served through an Express API, and rendered with React. Rate limiting is applied per IP via Upstash Redis to prevent abuse.

## Features

- Create, read, update, and delete notes
- Dark mode toggle
- Rate limiting on API routes (Upstash Redis)
- Responsive layout with TailwindCSS and DaisyUI

## Tech Stack

**Frontend:** React 19 · React Router · TailwindCSS · DaisyUI · Vite  
**Backend:** Node.js · Express 5 · MongoDB · Mongoose  
**Services:** Upstash Redis

## Prerequisites

- Node.js v18+
- A [MongoDB](https://www.mongodb.com/atlas) database (Atlas free tier works)
- An [Upstash](https://upstash.com) Redis database (free tier works)

## Getting Started

**1. Clone the repo**

```bash
git clone https://github.com/amln19/mnml-note.git
cd mnml-note
```

**2. Configure environment variables**

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=<your_mongodb_connection_string>
UPSTASH_REDIS_REST_URL=<your_upstash_redis_url>
UPSTASH_REDIS_REST_TOKEN=<your_upstash_redis_token>
NODE_ENV=development
```

**3. Install dependencies and start**

From the project root, this installs and starts both servers concurrently:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5001`.

To run them separately:

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (in a separate terminal)
cd frontend && npm install && npm run dev
```

**4. Production build**

```bash
npm run build
npm start
```

`npm run build` installs dependencies and compiles the frontend. `npm start` launches the backend, which serves the built static files. Set `NODE_ENV=production` in your environment.

## Troubleshooting

- **Cannot connect to MongoDB** — verify `MONGO_URI` and ensure your current IP is whitelisted in Atlas under Network Access.
- **Rate limiter errors on startup** — the server will log the error and continue, but check that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set correctly.
- **Port already in use** — ports 5001 (backend) and 5173 (frontend) must be free. Change them in `backend/src/server.js` and `frontend/vite.config.js` if needed.
- **`npm run dev` only starts one server** — the root script uses `&` for concurrency, which works on Unix/macOS. On Windows, run backend and frontend in separate terminals.

## License

ISC
