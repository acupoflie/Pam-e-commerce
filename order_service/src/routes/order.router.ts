import express, { NextFunction, Request, Response } from "express";
import { UserValidation } from "../utils/api/AuthValidation";
import { OrderService } from "../service/order.service";
const router = express.Router();

const orderService = new OrderService();

router.post(
  "/orders",
  UserValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({ message: "Unauthorized due to missing token" });
        return;
      }

      const order = await orderService.createOrder(user.id);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
