import { generateToken } from "../auth/jwt";
import { UserLoginType, UserType } from "../model";
import { ValidationError } from "../utils";
import { UserService } from "./user.service";
import argon2 from "argon2";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(user: UserType) {
    const userByEmail = await this.userService.getUserByEmail(user.email);
    if (userByEmail) throw new ValidationError("Email already exists");

    const userByUsername = await this.userService.getUserByUsername(
      user.username
    );
    if (userByUsername) throw new ValidationError("Username already exists");

    const hashedPassword = await argon2.hash(user.password);
    const newUser = {
      ...user,
      password: hashedPassword,
    };

    return await this.userService.createUser(newUser);
  }

  async login(user: UserLoginType) {
    const userByEmail = await this.userService.getUserByEmail(user.email);
    if (!userByEmail) throw new ValidationError("Email is incorrect");

    const isPasswordValid = await argon2.verify(
      userByEmail.password,
      user.password
    );
    if (!isPasswordValid) throw new ValidationError("Password is incorrect");

    const token = generateToken(userByEmail);
    return {
      message: "Login successful",
      token,
    };
  }
}
