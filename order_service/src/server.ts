import "dotenv/config";
import { logger } from "./utils/logger";
import app from "./expressApp";

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  logger.info(`Server has started on port ${PORT}`);
});
