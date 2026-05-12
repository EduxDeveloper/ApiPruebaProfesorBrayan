import express from "express";
import profesoresController from "../Controllers/controllerProfesores.js"

const router = express.Router();

router
    .route("/")
    .get(profesoresController.getProfesores);

router
    .route("/:id")
    .put(profesoresController.updateProfesores)
    .delete(profesoresController.deleteProfesores);

export default router;