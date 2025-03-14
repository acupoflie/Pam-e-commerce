import { Static, Type } from "@sinclair/typebox";

export const CreateBookSchema = Type.Object({
  title: Type.String({ minLength: 1, maxLength: 40 }),
  author: Type.String({ minLength: 2, maxLength: 40 }),
  description: Type.String({ minLength: 2, maxLength: 100 }),
  genres: Type.Array(Type.String({ minLength: 3, maxLength: 20 })),
  pageCount: Type.Number({ minimum: 1, maximum: 5000 }),
  price: Type.Number({ minimum: 2, maximum: 10000 }),
  stock: Type.Number(),
});

export type CreateBookType = Static<typeof CreateBookSchema>;

export const EditBookSchema = Type.Object({
  title: Type.Optional(Type.String({ minLength: 1, maxLength: 40 })),
  author: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
  description: Type.Optional(Type.String({ minLength: 2, maxLength: 100 })),
  genres: Type.Optional(
    Type.Array(Type.String({ minLength: 3, maxLength: 20 }))
  ),
  pageCount: Type.Optional(Type.Number({ minimum: 1, maximum: 5000 })),
  price: Type.Optional(Type.Number({ minimum: 2, maximum: 10000 })),
  stock: Type.Optional(Type.Number()),
});

export type EditBookType = Static<typeof EditBookSchema>;
