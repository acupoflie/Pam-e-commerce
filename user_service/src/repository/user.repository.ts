import { User } from "../model/User.model";
import { PrismaClient } from "@prisma/client";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUsers(limit: number, offset: number): Promise<User[]>;
  getUserByUsername(username: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

export class UserRepository implements IUserRepository {
  private _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async createUser(user: User): Promise<User> {
    return this._prisma.user.create({ data: user });
  }

  async getUsers(limit: number, offset: number): Promise<User[]> {
    return this._prisma.user.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this._prisma.user.findFirst({
      where: { username },
    });
    return user!;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this._prisma.user.findFirst({
      where: { email },
    });

    return user!;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this._prisma.user.findFirst({
      where: { id },
    });
    return user!;
  }

  async updateUser(user: User): Promise<User> {
    return this._prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this._prisma.user.delete({
      where: { id },
    });
  }
}
