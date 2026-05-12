import express from "express";
import logOutController from "../Controllers/logOutProfesores.js"

const router = express.Router();

router.route("/").post(logOutController.logOut);

export default router;