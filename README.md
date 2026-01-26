# MnmlNote

A minimalist notes web application for simple, distraction-free note-taking.

Full-Stack app built with the MERN stack (MongoDB, Express, React, Node).

## Features

- ✨ Clean, minimalist UI with dark mode support
- 📝 Create, read, update, and delete notes
- 🚀 Fast performance with Vite
- 🛡️ Rate limiting protection with Upstash Redis
- 📱 Responsive design with TailwindCSS

---

## Tech Stack

**Frontend:** React 19, React Router, TailwindCSS, DaisyUI, Vite  
**Backend:** Node.js, Express 5, MongoDB, Mongoose  
**Services:** Upstash Redis (rate limiting)

---

## Environment Setup

Create a `.env` file in the `/backend` directory:

```env
MONGO_URI=<your_mongodb_connection_string>
UPSTASH_REDIS_REST_URL=<your_upstash_redis_url>
UPSTASH_REDIS_REST_TOKEN=<your_upstash_redis_token>
NODE_ENV=development
```

---

## Development

### Option 1: Run Both Servers (Recommended)

```bash
npm run dev
```

This runs both frontend (port 5173) and backend (port 5001) concurrently.

### Option 2: Run Separately

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Production Deployment

```bash
npm run build
npm start
```

This builds the frontend and starts the backend server which serves the built static files.

Set `NODE_ENV=production` in your production environment.

---

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

---

## License

ISC