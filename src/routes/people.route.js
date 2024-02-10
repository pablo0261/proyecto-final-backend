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
 *     tags:
 *       - People
 *     responses:
 *       200:
 *         description: Retorna todas las personas.
 *       500:
 *         description: Error interno del servidor.
 */

peopleRouter.post('/people', postPeopleController);


peopleRouter.put('/people', putPeopleController);

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
