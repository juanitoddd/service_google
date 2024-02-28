// Setup
import "dotenv/config";
import "module-alias/register";
import express, { Application, Router, json } from "express";
// import { rabbitConsume } from "@shared";
// import consumer from "./functions/consumer";

// Routes
import routesMain from "./routes/main.route";

const router = Router();
const app: Application = express();

app.use(json());

// API Routes
router.use(routesMain);

// Base URL
app.use("/api/google/v1", router);

const _date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
console.log(`[Date] ${_date}`);

// HTTP Server
const PORT = process.env.PORT || 4004;
app.listen(PORT, (): void => {
  console.log(`[log] Google app listening at http://localhost:${PORT}`);
});

// RabbitMQ Queue
// rabbitConsume("google", consumer);
