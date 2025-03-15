import express, { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user.service";
import { UserRepository } from "../repository/user.repository";
import { ValidateRequest } from "../utils/requestValidator";
import { UserLoginSchema, UserLoginType, UserSchema, UserType } from "../model";
import {
  NotFoundError,
  Unauthorized,
  ValidationError,
} from "../utils/error/errors";
import { generateToken } from "../auth/jwt";
import { AuthService } from "../service/auth.service";
import passport, { configurePassport } from "../auth/passportjs";

const router = express.Router();

const userService = new UserService(new UserRepository());
const authService = new AuthService(userService);
configurePassport(userService);

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const input: UserType = req.body;
    const error = ValidateRequest<UserType>(req.body, UserSchema);

    if (error) return next(error);

    try {
      const user = await authService.register(input);
      const token = generateToken(user);
      res
        .status(201)
        .json({ message: "User created successfully", user, token });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const input: UserLoginType = req.body;
    try {
      const error = ValidateRequest<UserLoginType>(req.body, UserLoginSchema);
      if (error) return next(error);

      const user = await authService.login(input);
      if (!user) return next(new NotFoundError("User not found"));
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/validate",
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: Error, user: UserType) => {
        if (err) return next(err);
        if (!user) return next(new Unauthorized("Unauthorized"));

        res.status(200).json({ user });
      }
    )(req, res, next);
  }
);

export default router;
