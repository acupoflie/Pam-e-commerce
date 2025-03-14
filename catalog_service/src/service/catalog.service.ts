import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/ICatalogRepository";

export class CatalogService {
  private _repository: ICatalogRepository;

  constructor(repo: ICatalogRepository) {
    this._repository = repo;
  }

  async createBook(input: any) {
    return await this._repository.create(input);
  }

  async getBooks(limit: number, offset: number) {
    return await this._repository.find(limit, offset);
  }

  async getBook(id: string) {
    return await this._repository.findOne(id);
  }

  async updateBook(input: any) {
    return await this._repository.update(input);
  }

  async deleteBook(id?: string) {
    return this._repository.delete(id);
  }
}
