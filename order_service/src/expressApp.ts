import express from "express";
import { GlobalErrorHandler } from "./utils/error";
import { httpLogger } from "./utils/logger";
import cartRouter from "./routes/cart.router";
import orderRouter from "./routes/order.router";
const app = express();

app.use(express.json());
app.use(httpLogger);

app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);

app.use(GlobalErrorHandler);

export default app;
