import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sender from "./routes/sender.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: ["https://siliconvista.in", "http://siliconvista.in"],
  methods: ["GET", "POST"]
}));

// Serve frontend
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// API route
app.use("/contact", sender);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

