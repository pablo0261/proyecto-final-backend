const { Router } = require("express");

//aqui se importan los controllers

// creamos el enrutado para categorias
const categoriesRouter = Router();

categoriesRouter.get("/id", getCategoriasByIdController);
categoriesRouter.get(getCategoriasController);
categoriesRouter.post(postCategoriasController);
categoriesRouter.delete("/:id", deleteCategoriasController);

module.exports = categoriesRouter;
