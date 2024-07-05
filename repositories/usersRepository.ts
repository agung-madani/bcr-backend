import { UsersModel } from "../models/usersModel";

class UsersRepository {
  static async findByEmail(email: string) {
    return await UsersModel.query().findOne({ email });
  }
}

export default UsersRepository;
