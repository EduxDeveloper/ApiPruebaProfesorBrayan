import express from "express";
import tareasController from "../Controllers/tareasController.js"

const router = express.Router();

router
    .route("/")
    .get(tareasController.getTareas)
    .post(tareasController.insertTareas);

router
    .route("/:id")
    .put(tareasController.updateTareas)
    .delete(tareasController.deleteTareas);

export default router;