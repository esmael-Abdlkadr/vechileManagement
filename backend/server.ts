import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
process.on("unhandledRejection", (err: unknown) => {
  console.log("unhandled rejection! server shut down...");
  if (err instanceof Error) {
    console.log(err.name, err.message);
  } else {
    console.log(err);
  }
  process.exit(1);
});
