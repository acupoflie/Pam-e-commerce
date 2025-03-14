export class Book {
  constructor(
    public readonly title: string,
    public readonly author: string,
    public readonly description: string,
    public readonly genres: string[],
    public readonly pageCount: number,
    public readonly price: number,
    public readonly stock: number,
    public readonly id?: string
  ) {}
}
