import express from "express";
import AuthsController from "../controllers/authsController";

const router = express.Router();

router.post("/", AuthsController.login);

export default router;
