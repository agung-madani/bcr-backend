import { Request, Response } from "express";
import AuthsService from "../services/authsService";

class AuthsController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message:
            "All fields are required. Please provide values for all required fields.",
        });
      }

      const result = await AuthsService.login(email, password);

      if (result.status === 201) {
        return res.status(result.status).json({
          message: `Login successful for ${result.data.role}.`,
          token: result.data.token,
          role: result.data.role,
        });
      } else {
        return res.status(result.status).json({ message: result.data.message });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }
}

export default AuthsController;
