import express from "express";
import { GlobalErrorHandler } from "./utils/error";
import { httpLogger } from "./utils/logger";
import cartRouter from "./routes/cart.router";

const app = express();

app.use(express.json());
app.use(httpLogger);

app.use("api/v1/cart", cartRouter);

app.use(GlobalErrorHandler);

export default app;
