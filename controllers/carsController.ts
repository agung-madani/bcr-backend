import { Request, Response } from "express";
import CarsService from "../services/carsService";
import jwt from "jsonwebtoken";
import uploadImageToCloudinary from "../middlewares/cloudinaryMiddleware";

class CarsController {
  static async createCar(req: Request, res: Response) {
    try {
      // Add the Cloudinary middleware to handle image upload
      uploadImageToCloudinary(req, res, async () => {
        let {
          plate,
          manufacture,
          model,
          rentPerDay,
          capacity,
          description,
          availableAt,
          transmission,
          available,
          type,
          year,
          options,
          specs,
          withDriver,
        } = req.body;

        if (
          !plate ||
          !manufacture ||
          !model ||
          !rentPerDay ||
          !capacity ||
          !description ||
          !transmission ||
          !type ||
          !year ||
          !options ||
          !specs ||
          !withDriver
        ) {
          return res.status(400).json({
            message: "Required fields are missing.",
          });
        }

        rentPerDay = parseInt(rentPerDay);
        capacity = parseInt(capacity);
        year = parseInt(year);
        available = available === "true" ? true : false;
        withDriver = withDriver === "true" ? true : false;
        options = options.split(",").map((option: string) => option.trim());
        specs = specs.split(",").map((specs: string) => specs.trim());

        if (isNaN(rentPerDay) || isNaN(capacity) || isNaN(year)) {
          return res.status(400).json({
            message: "rentPerDay, capacity, and year must be valid numbers.",
          });
        }

        const result = await CarsService.createCar(
          plate,
          manufacture,
          model,
          (req as any).imageURL,
          rentPerDay,
          capacity,
          description,
          availableAt,
          transmission,
          available,
          type,
          year,
          options,
          specs,
          withDriver
        );

        if (result.status === 201) {
          return res.status(201).json({ message: "Car added successfully." });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }

  static async getAllCars(req: Request, res: Response) {
    try {
      let cars;

      const token = req.headers.authorization?.split(" ")[1];

      // If token is null, skip JWT verification
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
      }

      if ((req as any).user && (req as any).user.role) {
        cars = await CarsService.getCars();
        res
          .status(200)
          .json({ message: "All cars retrieved successfully.", data: cars });
      } else {
        cars = await CarsService.getAvailableCars();
        res.status(200).json({
          message: "Available cars retrieved successfully.",
          data: cars,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }

  static async getCarById(req: Request, res: Response) {
    try {
      const carId = req.params.id;
      const car = await CarsService.getCarById(carId);
      if (!car) {
        return res.status(404).json({ message: "Car not found." });
      }
      res
        .status(200)
        .json({ message: "Car retrieved successfully.", data: car });
    } catch (error: any) {
      if (error.message.includes("invalid input syntax for type uuid")) {
        return res.status(404).json({ message: "Car not found." });
      } else {
        res.status(500).json({
          message: "Internal Server Error.",
          error: (error as Error).message,
        });
      }
    }
  }

  static async updateCarById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if the car exists
      const existingCar = await CarsService.getCarById(id);
      if (!existingCar) {
        return res.status(404).json({ message: "Car not found." });
      }

      // Add the Cloudinary middleware to handle image upload
      uploadImageToCloudinary(req, res, async () => {
        let {
          plate,
          manufacture,
          model,
          rentPerDay,
          capacity,
          description,
          availableAt,
          transmission,
          available,
          type,
          year,
          options,
          specs,
          withDriver,
        } = req.body;

        // Update only the fields that are provided
        plate = plate || existingCar.plate;
        manufacture = manufacture || existingCar.manufacture;
        model = model || existingCar.model;
        (req as any).imageURL = (req as any).imageURL || existingCar.image;
        rentPerDay = rentPerDay || existingCar.rentPerDay;
        capacity = capacity || existingCar.capacity;
        description = description || existingCar.description;
        availableAt = availableAt || existingCar.availableAt;
        transmission = transmission || existingCar.transmission;
        available = available || existingCar.available;
        type = type || existingCar.type;
        year = year || existingCar.year;
        options = options || existingCar.options;
        specs = specs || existingCar.specs;
        withDriver = withDriver || existingCar.withDriver;

        rentPerDay = parseInt(rentPerDay);
        capacity = parseInt(capacity);
        year = parseInt(year);
        available = available === "true" ? true : false;
        withDriver = withDriver === "true" ? true : false;

        options = options.split(",").map((option: string) => option.trim());
        specs = specs.split(",").map((specs: string) => specs.trim());

        if (isNaN(rentPerDay) || isNaN(capacity) || isNaN(year)) {
          return res.status(400).json({
            message: "rentPerDay, capacity, and year must be valid numbers.",
          });
        }

        const result = await CarsService.updateCar(
          id,
          plate,
          manufacture,
          model,
          (req as any).imageURL,
          rentPerDay,
          capacity,
          description,
          availableAt,
          transmission,
          available,
          type,
          year,
          options,
          specs,
          withDriver
        );

        if (result.status === 200) {
          return res.status(200).json({ message: "Car updated successfully." });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }

  static async deleteCarById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if the car exists
      const existingCar = await CarsService.getCarById(id);
      if (!existingCar) {
        return res.status(404).json({ message: "Car not found." });
      }

      const result = await CarsService.deleteCarById(id);

      return res.status(201).json({ message: "Car deleted successfully." });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }
}

export default CarsController;
