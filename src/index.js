import "dotenv/config";
import express from "express";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
