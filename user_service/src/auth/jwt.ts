import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../model";

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
