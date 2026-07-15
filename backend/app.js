import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import cookieParser from "cookie-parser";

dotenv.config();

export const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());


//global rate limiter
//app.use()