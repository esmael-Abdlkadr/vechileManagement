import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";
import authRouter from "./src/routes/authRoute";
import vehicleRouter from "./src/routes/vechileRoute";
import { errorMiddleware } from "./src/utils/globalErrorHandler";

const app = express();
app.use(helmet());
const limitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limitter);
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/vehicle", vehicleRouter);

app.use(errorMiddleware);

export default app;
