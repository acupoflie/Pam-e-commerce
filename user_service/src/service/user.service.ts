import { User } from "../model";
import { IUserRepository } from "../repository/user.repository";
import { APIError } from "../utils/error/errors";

export class UserService {
  private _userRepository: IUserRepository;

  constructor(repo: IUserRepository) {
    this._userRepository = repo;
  }

  async createUser(user: User) {
    return await this._userRepository.createUser(user);
  }

  async getUsers(limit: number, offset: number) {
    return await this._userRepository.getUsers(limit, offset);
  }

  async getUserByUsername(username: string) {
    return await this._userRepository.getUserByUsername(username);
  }

  async getUserByEmail(email: string) {
    return await this._userRepository.getUserByEmail(email);
  }

  async getUserById(id: string) {
    return await this._userRepository.getUserById(id);
  }

  async updateUser(user: User) {
    return await this._userRepository.updateUser(user);
  }

  async deleteUser(id: string) {
    return await this._userRepository.deleteUser(id);
  }
}
