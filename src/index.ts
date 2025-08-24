import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 3000;



app.get("/", (req, res) => {
  res.send("Belavita setup are Done!");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}✅`);
});
