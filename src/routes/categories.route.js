const { Router } = require("express");

// controllers
const getCategories = require("../controllers/categories/getCategories.controller");
const getCategoriesOptions = require("../controllers/categories_options/getCategoriesOptions.controller");
const postCategories = require("../controllers/categories/postCategories.controller");
const postCategoriesOptionsController = require("../controllers/categories_options/postCategoriesOptions.controller");
const deleteCategoriesOptionsController = require("../controllers/categories_options/deleteCategoriesOptions.controller");

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
// /**
//  * @swagger
//  * /categories:
//  *   get:
//  *     summary: Obtener todas las categorías.
//  *     tags:
//  *       - Categories
//  *     responses:
//  *       200:
//  *         description: > 
//  *           Obtiene un objeto con dos propiedades: count y data.
//  *           count: contiene la cantidad de categorías registradas.
//  *           data: contiene un array de objetos, cada objeto contiene una categoría y sus propiedades.  
//  *       404:
//  *         description: No hay registro de categorías.
//  *       500:
//  *         description: Error interno del servidor.
//  */

categoriesRouter.get("/categories/options", getCategoriesOptions);
// /**
//  * @swagger
//  * /categories/options:
//  *   get:
//  *     summary: Obtener opciones de categorías.
//  *     tags:
//  *       - Categories
//  *     responses:
//  *       200:
//  *         description: > 
//  *           Obtiene un array de objetos, cada objeto contiene una opción de categoría y sus propiedades.
//  *       404:
//  *         description: No hay datos en categories_options.
//  *       500:
//  *         description: Error interno del servidor.
//  */

categoriesRouter.post("/categories", postCategories);
// /**
//  * @swagger
//  * /categories:
//  *   post:
//  *     summary: Crear una nueva categoría.
//  *     tags:
//  *       - Categories
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/CategoryInput'
//  *     responses:
//  *       201:
//  *         description: La categoría ha sido creada exitosamente.
//  *       400:
//  *         description: Petición incorrecta, los datos enviados no son válidos.
//  *       500:
//  *         description: Error interno del servidor.
//  */

categoriesRouter.post("/categories/options", postCategoriesOptionsController);

categoriesRouter.delete("/categories/options", deleteCategoriesOptionsController);

module.exports = categoriesRouter;
