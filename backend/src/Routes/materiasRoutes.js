import express from "express";
import materiasController from "../Controllers/materiasController.js"

const router = express.Router();

router
    .route("/")
    .get(materiasController.getMateria)
    .post(materiasController.insertMaterias);

router
    .route("/:id")
    .put(materiasController.updateMaterias)
    .delete(materiasController.deleteMateria);

export default router;