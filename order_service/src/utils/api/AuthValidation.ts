import axios from "axios";
import { NextFunction, Request, Response } from "express";
import "../../dto/user.model";

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
          Authorization: req.headers.authorization as string,
        },
      }
    );

    console.log(data.data);

    req.user = data.data.user;
    next();
  } catch (error) {
    next(error);
  }
};
