const { Router } = require('express');

// controllers
const { getPeopleController } = require("../controllers/people/getPeople.controller.js");
// const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');

const peopleRouter = Router();

peopleRouter.get('/people', getPeopleController);
/**
 * @swagger
 * /people:
 *   get:
 *     summary: Obtener todas las personas.
 *     tags:
 *       - People
 *     parameters:
 *       - in: cualquier campo de la tabla
 *         name: query
 *         required: false
 *         schema:
 *           type: string
 *         description: 
 *          en blanco todos los registros con paginado de 10 
 *          pageSize= items por pagina
 *          pageNumber= numero de pagina
 *          idOrder= con uno o varios campos de la tabla people con el criterio ASC,DESC separado por "," si son varios separados por ";"Ejemplo idGenre,DESC;fullName,ASC;
 *          idOption= id uno o varios idOption de la tabla categories_options separado por "," Ejemplo 1,3 devuelve todos las personas con esas opciones
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
/**
 * @swagger
 * /people:
 *   post:
 *     summary: Registrar una nueva persona.
 *     tags:
 *       - People
 *     requestBody:
 *       description: Datos de la persona a registrar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               password: 
 *                 type: string
 *               typeOfPerson:
 *                 type: string
 *               birthDate:
 *                 type: date
 *     responses:
 *       201:
 *         description: >
 *           Persona registrada exitosamente. Obtiene un objeto con todos los datos de la persona creada.
 *       400:
 *         description: Datos de la persona no válidos o incompletos.
 *       500:
 *         description: Error interno del servidor.
 */

module.exports = peopleRouter;
