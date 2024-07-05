import express from "express";
import CarsController from "../controllers/carsController";
import { authsMiddleware } from "../middlewares/authsMiddleware";

const router = express.Router();

router.post("/", authsMiddleware, CarsController.createCar);
router.get("/", CarsController.getAllCars);
router.get("/:id", authsMiddleware, CarsController.getCarById);
router.put("/:id", authsMiddleware, CarsController.updateCarById);
router.delete("/:id", authsMiddleware, CarsController.deleteCarById);

export default router;
