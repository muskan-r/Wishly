import "./config/loadEnv.js";
import connectDB from "./config/db.js";
import pageRoutes from "./routes/pageRoutes.js";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

/* ----------------------------------
   Middleware
---------------------------------- */

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json({ limit: "10mb" }));


/* ----------------------------------
   Test Route
---------------------------------- */

app.use("/api/pages", pageRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Wishly API is running ✨",
  });
});


/* ----------------------------------
   Start Server
---------------------------------- */

connectDB();

app.listen(PORT, () => {
  console.log(`✨ Wishly backend running on PORT ${PORT}`);
});