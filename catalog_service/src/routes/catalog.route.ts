import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../service/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";

const router = express.Router();

const catalogService = new CatalogService(new CatalogRepository());

router.post(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    const input = req.body;

    try {
      const data = await catalogService.createBook(input);
      res.status(200).json({ message: "book created succesfully", data });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset);

    try {
      const data = await catalogService.getBooks(limit, offset);
      res.status(200).json({ message: "books fetched succesfully", data });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/books/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const data = await catalogService.getBook(id);
      res.status(200).json({ message: "book fetched succesfully", data });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/books/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const input = req.body;

    try {
      const data = await catalogService.updateBook({ id, ...input });
      res.status(200).json({ message: "book updated succesfully", data });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/books/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      await catalogService.deleteBook(id);
      res.status(200).json({ message: "book deleted succesfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
