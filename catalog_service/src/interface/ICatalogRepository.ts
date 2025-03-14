import { Book } from "../models/book.model";

export interface ICatalogRepository {
    create(data: Book): Promise<Book>
    findOne(id: string): Promise<Book>
    find(limit: number, offset: number): Promise<Book[]>
    update(data: Book): Promise<Book>
    delete(id: string): any
}