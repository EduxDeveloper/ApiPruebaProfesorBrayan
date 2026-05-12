import express from "express";
import EstudiantesloginController from "../Controllers/loginEstudiantesController.js"

const router = express.Router();

router.route("/").post(EstudiantesloginController.login);

export default router;