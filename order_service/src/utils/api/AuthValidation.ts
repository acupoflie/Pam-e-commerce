import axios from "axios";
import { NextFunction, Request, Response } from "express";

export const UserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: "Unauthorized due to missing token" });
      return;
    }

    const data = await axios.get(
      "http://localhost:9001/api/v1/users/validate",
      {
        headers: {
          Authorization: req.headers.Authorization as string,
        },
      }
    );

    console.log(data)

    req.user = data.data;
    next();
  } catch (error) {
    next(error);
  }
};
