import "dotenv/config";
import express, { Request, Response } from "express";
import QueryString from "qs";

import { NODE_ENV, PORT } from "./env";
import {
  CorsMiddleware,
  DatabaseMiddleware,
  ResponseMiddleware,
} from "./middlewares";
import { connectDB } from "./configs";
import { router } from "./routes";

const app = express();

const port = PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("query parser", (str: string) => QueryString.parse(str));

// Custom Middlewares
app.use(ResponseMiddleware.success);
app.use(CorsMiddleware.checkOrigin);
app.use(DatabaseMiddleware.checkConnection);

app.get("/", (_: Request, res: Response) => {
  res.success(200, "Welcome to Bellavita API");
});

// All API Routes
app.use("/api", router);

// Error Handling Routes
app.use(ResponseMiddleware.notFound);
app.use(ResponseMiddleware.error);

if (NODE_ENV === "development") {
  app.listen(port, async () => {
    try {
      await connectDB();
      console.log(`Server running on http://localhost:${port}`);
    } catch (error) {
      console.error("Server startup failed:", error);
      process.exit(1);
    }
  });
}
