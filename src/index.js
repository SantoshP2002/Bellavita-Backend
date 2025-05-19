import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./router/auth.routes.js";
import connectDB from "./config/db.js";

const server = express();
server.use(express.json());

server.use(cors());

server.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8080;

server.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on port ${PORT}`);
});

export default server;
