import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/ICatalogRepository";
import { Book } from "../models/book.model";
import { NotFoundError } from "../utils/error/errors";

export class CatalogRepository implements ICatalogRepository {
  private _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Book): Promise<Book> {
    return this._prisma.book.create({ data });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this._prisma.book.findFirst({
      where: { id },
    });
    if (!book) throw new NotFoundError("product not found");
    return book;
  }

  async find(limit: number, offset: number): Promise<Book[]> {
    return this._prisma.book.findMany({
      take: limit,
      skip: offset,
    });
  }

  async update(data: Book): Promise<Book> {
    return this._prisma.book.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: string) {
    return this._prisma.book.delete({
      where: { id },
    });
  }
}
