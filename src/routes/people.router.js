const { Router } = require('express');

// controllers
const { getPeopleController } = require("../controllers/people/getPeople.controller.js");
const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');
const { getPeopleOptionsController } = require("../controllers/people/getPeopleOptions.controller.js")

const peopleRouter = Router();

peopleRouter.get('/people/:id', getPeopleByIdController);
/**
 * @swagger
 * /people/{id}:
 *   get:
 *     summary: Obtener información de una persona por su ID.
 *     tags:
 *       - People
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la persona que se desea obtener.
 *     responses:
 *       200:
 *         description: > 
 *           Obtiene la información de la persona correspondiente al ID proporcionado.
 *           Retorna un objeto con un propiedad: people, el cual tiene como valor un objeto con todas las
 *           propiedades de la persona.
 *       404:
 *         description: No fue encontrado nadie con ese ID.
 *       500:
 *         description: Error interno del servidor.
 */

peopleRouter.get('/people', getPeopleController);
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
 *           Obtiene un objeto llamado people con dos propiedades: count y data.
 *           count: contiene la cantidad de personas registradas.
 *           data: contiene un array de objetos, cada objeto contiene una persona y sus propiedades.  
 *       404:
 *         description: No hay registro de personas.
 *       500:
 *         description: Error interno del servidor.
 */

peopleRouter.post('/people', postPeopleController);



// prueba del controller getPeopleOptions - será removido cuando getPeopleOptionsController se invocado en otro lugar
peopleRouter.get('/peopleoptions/:idPeople', getPeopleOptionsController)


module.exports = peopleRouter;
