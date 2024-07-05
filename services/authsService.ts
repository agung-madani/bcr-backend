import UsersRepository from "../repositories/usersRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthsService {
  static async login(email: string, password: string) {
    try {
      const user = await UsersRepository.findByEmail(email);

      if (!user) {
        return {
          status: 404,
          data: {
            message:
              "The email or password provided is incorrect. Please check your credentials and try again.",
          },
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          status: 401,
          data: {
            message:
              "The email or password provided is incorrect. Please check your credentials and try again.",
          },
        };
      }

      if (user.role !== "admin") {
        return {
          status: 403,
          data: {
            message: "You do not have permission to access this resource.",
          },
        };
      }

      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "30d" }
      );

      return {
        status: 201,
        data: { token, role: user.role },
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default AuthsService;
