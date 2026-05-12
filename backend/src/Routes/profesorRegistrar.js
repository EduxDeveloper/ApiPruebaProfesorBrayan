import express from "express";
import registerProfesorController from "../Controllers/profesoresRegistrarController.js"
import { verify } from "crypto";

const router = express.Router();

router.route("/").post(registerProfesorController.register);
router.route("/verifyCode").post(registerProfesorController.verifyCode);

export default router;