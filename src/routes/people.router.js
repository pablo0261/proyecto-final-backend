const { Router } = require('express');

// controllers
const { getPeopleController } = require("../controllers/people/getPeople.controller.js");
const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { getPeopleFilterController } = require('../controllers/people/getPeopleFilter.controller.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');
const { getPeopleOptionsController } = require("../controllers/people/getPeopleOptions.controller.js")

const peopleRouter = Router();

peopleRouter.get('/people/type', getPeopleFilterController);
/**
 * @swagger
 * /people/type:
 *   get:
 *     summary: Filtrar personas por tipo.
 *     tags:
 *       - People
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: >
 *           El tipo de persona por el que se desea filtrar: customer, administrator, o provider.
 *     responses:
 *       200:
 *         description: >
 *           Obtiene un objeto con la propiedad "people", que tiene como valor un objeto con dos propiedades:
 *           count: Cantidad de personas del tipo pasado por parámetro.
 *           data: Un array de objetos con todas las personas que coinciden con el tipo especificado.
 *       404:
 *         description: No se encontraron personas de este tipo.
 *       500:
 *         description: Error interno del servidor.
 */

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
