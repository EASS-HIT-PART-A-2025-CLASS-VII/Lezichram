import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import run from "./postsScript.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "ingestion-service" });
});

app.post("/ingest", async (req, res) => {
  try {
    await run();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || "Unkown error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Ingestion service running on port ${PORT}`);
});
