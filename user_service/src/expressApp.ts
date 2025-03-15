import express from "express";
import { httpLogger } from "./utils/logger";
import { GlobalErrorHandler } from "./utils/error/handler";
import userRouter from "./router/user.router";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(httpLogger);

app.use(passport.initialize());

app.use("/api/v1/users", userRouter);

app.use(GlobalErrorHandler);

export default app;
