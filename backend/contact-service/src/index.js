import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "contact-service" });
});

app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { error } = await supabase
      .from("contacts")
      .insert([{ name, email, phone, message }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Unexpected server error:", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Contact service running on port ${PORT}`);
});
