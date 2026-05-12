import express from "express";
import categoriasController from "../Controllers/categoriasController.js"

const router = express.Router();

router
    .route("/")
    .get(categoriasController.getCategorias)
    .post(categoriasController.insertCategorias);

router
    .route("/:id")
    .put(categoriasController.updateCategorias)
    .delete(categoriasController.deleteCategoria);

export default router;