import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { pool } from "./db.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount each router here:
app.use("/api/products", productsRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Express 5 forwards errors from async handlers here, so controllers don't need try/catch.
const onError: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Invalid request", details: err.issues.map((i) => `${i.path.join(".")}: ${i.message}`) });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};
app.use(onError);

const server = app.listen(port, () => console.log(`API on http://localhost:${port}`));

process.on("SIGTERM", () => server.close(() => void pool.end()));
