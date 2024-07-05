import express from "express";
import authsRouter from "./authsRouter";
import carsRouter from "./carsRouter";

const router = express.Router();

router.use("/login", authsRouter);
router.use("/cars", carsRouter);

export default router;
