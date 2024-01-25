const { Router } = require("express");

// controllers
const getCategories = require("../controllers/categories/getCategories.controller");
const getCategoriesOptions = require("../controllers/categories_options/getCategoriesOptions.controller");
const postCategories = require("../controllers/categories/postCategories.controller");

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.get("/categoriesoptions", getCategoriesOptions);
/**
 * @swagger
 * /categoriesoptions:
 *   get:
 *     summary: Filtrar las opciones de las categorias.
 *     tags:
 *       - Categorias
 *     responses:
 *       200:
 *         description: >
 *           Obtiene un objeto con la propiedad "categorias opcion", que tiene como valor un objeto con una propiedad:
 *           data: Un array de objetos con todas las opciones que coinciden con el tipo de categoria especificado.
 *       404:
 *         description: No hay datos en categories_options.
 *       500:
 *         description: Error interno del servidor.
 */
categoriesRouter.post("/categories", postCategories);

module.exports = categoriesRouter;
