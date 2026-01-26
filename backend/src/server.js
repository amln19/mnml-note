import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined in environment variables");
  process.exit(1);
}

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.error("❌ Error: Upstash Redis credentials are not defined in environment variables");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json({ limit: "10mb" }));
app.use(rateLimiter);

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
