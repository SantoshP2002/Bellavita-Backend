import "dotenv/config"
import express, { Request, Response } from "express";
import QueryString from "qs";

import { PORT } from "./env";
import { CorsMiddleware, ResponseMiddleware } from "./middlewares";

const app = express();

const port = PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("query parser", (str: string) => QueryString.parse(str));

app.use(CorsMiddleware.checkOrigin);

app.get("/", (_: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Bellavita API",
  });
})
// Error Handling Routes
app.use(ResponseMiddleware.notFound);
app.use(ResponseMiddleware.error)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
