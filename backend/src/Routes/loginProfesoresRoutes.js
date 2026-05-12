import express from "express";
import ProfesoresloginController from "../Controllers/loginProfesoresController.js"

const router = express.Router();

router.route("/").post(ProfesoresloginController.login);

export default router;