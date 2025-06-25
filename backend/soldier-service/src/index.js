import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "soldier-service" });
});

app.get("/soldiers", async (req, res) => {
  const { data, error } = await supabase
    .from("posts")
    .select("name, caption, img_url, permalink, like_count, comments_count");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const normalized = data.map((row) => ({
    name: row.name,
    imgSrc: row.img_url,
    permalink: row.permalink,
    likeCount: row.like_count,
    commentsCount: row.comments_count,
  }));

  res.json(normalized);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Soldier service running on port ${PORT}`);
});
