import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import router from './routes/api.js';
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from './app/config/config.js';

const app = express();

// 🔹 Default Middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(xss());
app.use(hpp());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());

// 🔹 Rate Limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

// 🔹 Cache Setting
app.set('etag', WEB_CACHE);

// 🔹 MongoDB Connection
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhalbrt.mongodb.net/${process.env.DB_NAME}`; // ✅ database name add করো
mongoose.connect(URI)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.error("❌ Database Error:", err));


app.use(express.static('client/dist'))
// 🔹 Routes
app.use("/api", router);

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
