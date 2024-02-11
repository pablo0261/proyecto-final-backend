const { Router } = require('express');
const { postChatsController } = require('../controllers/chats/postChats.controller');
const { getChatsController } = require('../controllers/chats/getChats.controller');

// controllers

const chatsRouter = Router();

chatsRouter.get('/chats', getChatsController);
// /**
//  * @swagger
//  * /chats:
//  *   get:
//  *     summary: Obtener todos los chat de una oportunidad
//  *     tags:
//  *       - Chats
//  *     parameters:
//  *       - in: id de oportunidad
//  *         name: query
//  *         required: false
//  *         schema:
//  *           type: string
//  *         description:
//  *           idOportunidad= id de oportunidad
//  *           idPeople= idpeople
//  *     responses:
//  *       200:
//  *         description: >
//  *           Obtiene un objeto llamado chats con dos propiedades: count y data.
//  *           count: contiene la cantidad de chats registradas.
//  *           data: contiene un array de objetos, cada objeto contiene un chat  sus propiedades.
//  *       404:
//  *         description: No hay registros de chats.
//  *       500:
//  *         description: Error interno del servidor.
//  */

chatsRouter.post('/chats', postChatsController);
// /**
//  * @swagger
//  * /chats:
//  *   post:
//  *     summary: Registrar un nuev chat.
//  *     tags:
//  *       - Chats
//  *     requestBody:
//  *       description: Datos del chat.
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               age:
//  *                 type: integer
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *               typeOfPerson:
//  *                 type: string
//  *               birthDate:
//  *                 type: date
//  *     responses:
//  *       201:
//  *         description: >
//  *           Persona registrada exitosamente. Obtiene un objeto con todos los datos de la persona creada.
//  *       400:
//  *         description: Datos de la persona no válidos o incompletos.
//  *       500:
//  *         description: Error interno del servidor.
//  */


module.exports = chatsRouter;
