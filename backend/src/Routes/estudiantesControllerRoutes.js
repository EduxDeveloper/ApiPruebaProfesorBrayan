import express from "express";
import estudiantesController from "../Controllers/controllerEstudiantes.js";

const router = express.Router();


router
    .route("/")
    .get(estudiantesController.getEstudiantes);
    
router
    .route("/:id")
    .put(estudiantesController.updateEstudiantes)
    .delete(estudiantesController.deleteEstudiantes);
export default router;