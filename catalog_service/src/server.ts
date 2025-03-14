import "dotenv/config";
import express from "express";
import catalogRouter from "./routes/catalog.route";

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json())

app.use("/api/v1", catalogRouter);

app.listen(PORT, () => {
  console.log("server has started on port: ", PORT);
});
