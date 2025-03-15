import { Type, Static } from "@sinclair/typebox";

export class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public id?: string
  ) {}
}

export const UserSchema = Type.Object({
  username: Type.String({ minLength: 4, maxLength: 20 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export type UserType = Static<typeof UserSchema>;

export const UserLoginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
});

export type UserLoginType = Static<typeof UserLoginSchema>;
