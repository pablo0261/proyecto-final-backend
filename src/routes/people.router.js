const { Router } = require('express');

// controllers
const { getPeopleController } = require("../controllers/people/getPeople.controller.js");
// const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');

const peopleRouter = Router();

//peopleRouter.get('/people/:id', getPeopleByIdController);
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
 *           Obtiene un objeto con la, el cual tiene una propiedad llamada data que es un array,
 *           el array contiene todas las informaciones de la persona.
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
