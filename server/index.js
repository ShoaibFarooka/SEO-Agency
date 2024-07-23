import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import contactRoutes from "./routes/contactRoutes.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:3003",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use("/api", contactRoutes);

app.get("*", (req, res) => {
  res.send(`SEO Agency Web App Server`);
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`SEO Agency Server is running on port ${PORT}`)
);
