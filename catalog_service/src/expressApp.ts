import express from "express";
import catalogRouter from "./routes/catalog.route";
import { GlobalErrorHandler } from "./utils/error";
import { httpLogger } from "./utils/logger";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(httpLogger);
app.use(cors());

app.use("/api/v1", catalogRouter);

app.use(GlobalErrorHandler);

export default app;
