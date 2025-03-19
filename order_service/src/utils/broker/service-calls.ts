import axios from "axios";
import { logger } from "../logger";
import { NotFoundError } from "../error";

export const GetBookDetails = async (bookId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:9000/api/v1/books/${bookId}`
    );
    return response.data;
  } catch (err) {
    logger.error(err);
    throw new NotFoundError("Book not found");
  }
};
