const { Router } = require('express');

// controllers
const { getPeopleController } = require("../controllers/people/getPeople.controller.js");
const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { getPeopleFilterController } = require('../controllers/people/getPeopleFilter.controller.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');

const peopleRouter = Router();

peopleRouter.get('/people/type', getPeopleFilterController);
peopleRouter.get('/people/:id', getPeopleByIdController);
peopleRouter.get('/people', getPeopleController);
peopleRouter.post('/people', postPeopleController);
/**
 * @swagger
 * /people:
 *   get:
 *     summary: Obtener todas las personas.
 *     tags:
 *       - People
 *     responses:
 *       200:
 *         description: > 
 *           Obtiene un objeto con dos propiedades: count y data.
 *           count: contiene la cantidad de personas registradas.
 *           data: contiene un array de objetos, cada objeto contiene una persona y sus propiedades.  
 *       404:
 *         description: No hay registro de personas.
 *       500:
 *         description: Error interno del servidor.
 */

module.exports = peopleRouter;
