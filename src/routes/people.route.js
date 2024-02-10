const { Router } = require('express');

// controllers
const { getPeopleController } = require('../controllers/people/getPeople.controller.js');
// const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');
const loginPeopleController = require('../controllers/logins/loginPeople.controller.js');
const { getPeopleOptionsController } = require('../controllers/people_options/getPeopleOptions.controller.js');
const postPeopleOptionsController = require('../controllers/people_options/postPeopleOptions.controller.js');
const { putPeopleController } = require('../controllers/people/putPeople.controlle.js');
const deletePeopleOptionsContoller = require('../controllers/people_options/deletePeopleOptions.controller.js');
const logoutPeopleController = require('../controllers/logins/logoutPeople.controller.js');

const peopleRouter = Router();

peopleRouter.get('/people', getPeopleController);
/**
 * @swagger
 * /people:
 *   get:
 *     summary: Obtener todas las personas.
 *     description: |
 *       Esta operación permite obtener todas las personas que coincidan con los criterios de búsqueda especificados.
 *       Puedes filtrar las personas por su nombre completo, ubicación, provincia, fecha de nacimiento, edad, estado, tipo de persona, correo electrónico, calificación promedio, etc.
 *       Los parámetros de consulta son opcionales y pueden combinarse para refinar la búsqueda.
 *       Si no se utiliza ningun parametro, se devolverá todas las personas.
 *     tags:
 *       - People
 *     parameters:
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         description: Nombre completo de la persona.
 *       - in: query
 *         name: idLocation
 *         schema:
 *           type: integer
 *         description: ID de la ubicación de la persona.
 *       - in: query
 *         name: locationName
 *         schema:
 *           type: string
 *         description: Nombre de la ubicación de la persona.
 *       - in: query
 *         name: idProvince
 *         schema:
 *           type: string
 *         description: ID de la provincia de la persona.
 *       - in: query
 *         name: provinceName
 *         schema:
 *           type: string
 *         description: Nombre de la provincia de la persona.
 *       - in: query
 *         name: birthDate YY-MM-DD
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de nacimiento de la persona.
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Edad de la persona.
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Estado de la persona.
 *       - in: query
 *         name: typeOfPerson
 *         schema:
 *           type: string
 *         description: Tipo de persona.
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Correo electrónico de la persona.
 *       - in: query
 *         name: averageRating
 *         schema:
 *           type: string
 *         description: Calificación promedio de la persona.
 *     responses: 
 *       200:
 *         description: Retorna todas las personas que coinciden con los criterios de búsqueda.
 *       404:
 *         description: No se encontraron registros de personas.
 *       500:
 *         description: Error interno del servidor.
 */


// peopleRouter.post('/people', postPeopleController);

peopleRouter.put('/people', putPeopleController);
/**
 * @swagger
 * /people:
 *   put:
 *     summary: Editar los datos de una persona.
 *     description: |
 *       Permite editar los datos de una persona existente. 
 *       Se requieren las siguientes propiedades básicas: idPeople, fullName, birthDate, email, password, typeOfPerson.
 *     tags:
 *       - People
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               idPeople:
 *                 type: string
 *                 description: ID único de la persona.
 *               fullName:
 *                 type: string
 *                 description: Nombre completo de la persona.
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento de la persona en formato YYYY-MM-DD.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico de la persona.
 *               password:
 *                 type: string
 *                 description: Contraseña de la persona.
 *               typeOfPerson:
 *                 type: string
 *                 description: Tipo de persona.
 *     responses:
 *       200:
 *         description: Datos de la persona actualizados correctamente.
 *       400:
 *         description: Error en los datos proporcionados. Falta el id de la persona.
 *       500:
 *         description: Error interno del servidor.
 */


peopleRouter.post('/people/login', loginPeopleController);
/**
 * @swagger
 * /people/login:
 *   post:
 *     summary: Iniciar sesión de usuario.
 *     tags:
 *       - People
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       400:
 *         description: Error en los datos de inicio de sesión.
 *       401:
 *         description: Credenciales de inicio de sesión no válidas.
 *       500:
 *         description: Error interno del servidor.
 */

peopleRouter.get('/people/options/:idPeople', getPeopleOptionsController);

peopleRouter.post('/people/options', postPeopleOptionsController);

peopleRouter.delete('/people/options', deletePeopleOptionsContoller);
peopleRouter.put('/people/logout', logoutPeopleController);

module.exports = peopleRouter;
