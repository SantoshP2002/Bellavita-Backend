import express from "express";
import QueryString from "qs";

import { PORT } from "./env";

const app = express();

const port = PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("query parser", (str: string) => QueryString.parse(str));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
