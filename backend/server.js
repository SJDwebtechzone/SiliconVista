import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import sender from "./routes/sender.js";
import { connectDB } from "./src/config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import bannerRoutes from "./src/routes/bannerRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import testimonialRoutes from "./src/routes/testimonialRoutes.js";
import settingRoutes from "./src/routes/settingRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import popupRoutes from "./src/routes/popupRoutes.js";
import brochureRoutes from "./src/routes/brochureRoutes.js";
import partnerRoutes from "./src/routes/partnerRoutes.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import googleReviewRoutes from "./src/routes/googleReview.routes.js";
import { initCronJobs } from "./src/cron/googleReviewSync.js";
import newsEventRoutes from "./src/routes/newsEventRoutes.js";

// Connect to Database
connectDB();

// Initialize Cron Jobs
initCronJobs();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      origin === "https://siliconvista.in" ||
      origin === "http://siliconvista.in" ||
      /^http:\/\/localhost:\d+$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Serve frontend
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// API route
app.use("/contact", sender);
app.use("/api/admin", adminRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin/testimonials", testimonialRoutes); // Admin side testimonials
app.use("/api/settings", settingRoutes);
app.use("/api/news-events", newsEventRoutes);
app.use("/api/popup", popupRoutes);
app.use("/api/brochure", brochureRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/google-reviews", googleReviewRoutes);
app.use("/api", courseRoutes);

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});