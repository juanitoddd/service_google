// Setup
import "dotenv/config";
import "module-alias/register";
import express, { Application, NextFunction, Router, json } from "express";
import { googleAuth } from "./controllers/auth";
import { rabbitConsume } from "./functions/rabbit";
import consumer from "./functions/consumer";

// Routes
import routesMain from "./routes/main.route";

const router = Router();
const app: Application = express();

// Middleware
app.use(googleAuth as any);

// Body Json
app.use(json());

// API Routes
router.use(routesMain);

// Base URL
app.use("/api/google/v1", router);

const _date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
console.log(`[Date] ${_date}`);

// HTTP Server
const PORT = process.env.PORT || 4014;
app.listen(PORT, (): void => {
  console.log(`[log] Google app listening at http://localhost:${PORT}`);
});

// RabbitMQ Queue
rabbitConsume("google", consumer);
