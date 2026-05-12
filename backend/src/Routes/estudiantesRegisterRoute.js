import express from "express";
import registerEstudianteController from "../Controllers/registerEstudianteController.js"
import { verify } from "crypto";

const router = express.Router();

router.route("/").post(registerEstudianteController.register);
router.route("/verifyCode").post(registerEstudianteController.verifyCode);

export default router;