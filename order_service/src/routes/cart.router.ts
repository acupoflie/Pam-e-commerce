import express, { NextFunction, Request, Response } from "express";
import { ValidateRequest } from "../utils/requestValidator";
import { CartRequestSchema, CartRequestType } from "../dto/cartRequest.dto";
import { CartService } from "../service/cart.service";
import { CartRepository } from "../repository/cart.repository";
import { UserValidation } from "../utils/api/AuthValidation";

const router = express.Router();

const cartService = new CartService(new CartRepository());

router.post(
  "/carts",
  UserValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      res.status(403).json({ message: "You are not authorized to do this" });
      return;
    }

    const errors = ValidateRequest<CartRequestType>(
      CartRequestSchema,
      req.body
    );

    if (errors) {
      res.status(400).json(errors);
      return;
    }

    try {
      const cartId = await cartService.createCart(user.id, req.body);
      res.status(201).json({
        cartId,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
