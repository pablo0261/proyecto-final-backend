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

peopleRouter.post('/people', postPeopleController);

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

peopleRouter.get('/people/options/:idPeople', getPeopleOptionsController);
// /**
//  * @swagger
//  * /people/options/{idPeople}:
//  *   get:
//  *     summary: Obtener las opciones de una persona por su idPeople.
//  *     description: |
//  *       Esta operación permite obtener las opciones de una persona por su ID específico.
//  *       Proporciona información detallada sobre la persona y sus opciones asociadas.
//  *     tags:
//  *       - People Options
//  *     parameters:
//  *       - in: path
//  *         name: idPeople
//  *         required: true
//  *         description: ID único de la persona.
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Opciones de la persona obtenidas correctamente.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 people:
//  *                   type: object
//  *                   properties:
//  *                     totalCount:
//  *                       type: integer
//  *                       description: Total de personas.
//  *                     totalOfPages:
//  *                       type: integer
//  *                       description: Total de páginas.
//  *                     count:
//  *                       type: integer
//  *                       description: Cantidad de personas.
//  *                     pageSize:
//  *                       type: integer
//  *                       description: Tamaño de la página.
//  *                     pageNumber:
//  *                       type: integer
//  *                       description: Número de la página.
//  *                     filter:
//  *                       type: object
//  *                       properties:
//  *                         fullName:
//  *                           type: string
//  *                           description: Nombre completo de la persona.
//  *                         state:
//  *                           type: string
//  *                           description: Estado de la persona.
//  *                     data:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           idPeople:
//  *                             type: string
//  *                             description: ID único de la persona.
//  *                           fullName:
//  *                             type: string
//  *                             description: Nombre completo de la persona.
//  *                           address:
//  *                             type: string
//  *                             description: Dirección de la persona.
//  *                           idLocation:
//  *                             type: integer
//  *                             description: ID de la ubicación de la persona.
//  *                           locationName:
//  *                             type: string
//  *                             description: Nombre de la ubicación de la persona.
//  *                           idProvince:
//  *                             type: string
//  *                             description: ID de la provincia de la persona.
//  *                           provinceName:
//  *                             type: string
//  *                             description: Nombre de la provincia de la persona.
//  *                           geoposition:
//  *                             type: string
//  *                             description: Posición geográfica de la persona.
//  *                           birthDate:
//  *                             type: string
//  *                             format: date
//  *                             description: Fecha de nacimiento de la persona.
//  *                           age:
//  *                             type: integer
//  *                             description: Edad de la persona.
//  *                           idGenre:
//  *                             type: string
//  *                             description: ID del género de la persona.
//  *                           state:
//  *                             type: string
//  *                             description: Estado de la persona.
//  *                           aboutMe:
//  *                             type: string
//  *                             description: Información sobre la persona.
//  *                           dateOfAdmission:
//  *                             type: string
//  *                             format: date
//  *                             description: Fecha de admisión de la persona.
//  *                           typeOfPerson:
//  *                             type: string
//  *                             description: Tipo de persona.
//  *                           email:
//  *                             type: string
//  *                             format: email
//  *                             description: Correo electrónico de la persona.
//  *                           externalLogin:
//  *                             type: string
//  *                             description: Login externo de la persona.
//  *                           averageRating:
//  *                             type: string
//  *                             description: Calificación promedio de la persona.
//  *                           countRating:
//  *                             type: integer
//  *                             description: Cantidad de calificaciones.
//  *                           logged:
//  *                             type: boolean
//  *                             description: Indica si la persona está registrada.
//  *                           phone:
//  *                             type: string
//  *                             description: Número de teléfono de la persona.
//  *                           location:
//  *                             type: string
//  *                             description: Ubicación de la persona.
//  *                           country:
//  *                             type: string
//  *                             description: País de la persona.
//  *                           profession:
//  *                             type: string
//  *                             description: Profesión de la persona.
//  *                           image:
//  *                             type: string
//  *                             description: URL de la imagen de la persona.
//  *                           categories:
//  *                             type: array
//  *                             items:
//  *                               type: object
//  *                               properties:
//  *                                 idCategorie:
//  *                                   type: integer
//  *                                   description: ID de la categoría.
//  *                                 description:
//  *                                   type: string
//  *                                   description: Descripción de la categoría.
//  *                                 isGenre:
//  *                                   type: boolean
//  *                                   description: Indica si es género.
//  *                                 isEducation:
//  *                                   type: boolean
//  *                                   description: Indica si es educación.
//  *                                 isSkill:
//  *                                   type: boolean
//  *                                   description: Indica si es habilidad.
//  *                                 isService:
//  *                                   type: boolean
//  *                                   description: Indica si es servicio.
//  *                                 isInterest:
//  *                                   type: boolean
//  *                                   description: Indica si es interés.
//  *                                 isExperience:
//  *                                   type: boolean
//  *                                   description: Indica si es experiencia.
//  *                                 isExtra:
//  *                                   type: boolean
//  *                                   description: Indica si es extra.
//  *                                 includeCustomer:
//  *                                   type: boolean
//  *                                   description: Indica si incluye al cliente.
//  *                                 includeProvider:
//  *                                   type: boolean
//  *                                   description: Indica si incluye al proveedor.
//  *                                 categories_options:
//  *                                   type: array
//  *                                   items:
//  *                                     type: object
//  *                                     properties:
//  *                                       idOption:
//  *                                         type: string
//  *                                         description: ID de la opción.
//  *                                       description:
//  *                                         type: string
//  *                                         description: Descripción de la opción.
//  *                                       price:
//  *                                         type: string
//  *                                         description: Precio de la opción.
//  *                                       date:
//  *                                         type: string
//  *                                         format: date
//  *                                         description: Fecha de la opción.
//  *                                       year:
//  *                                         type: integer
//  *                                         description: Año de la opción.
//  *                                       institution:
//  *                                         type: string
//  *                                         description: Institución de la opción.
//  *                                       comment:
//  *                                         type: string
//  *                                         description: Comentario de la opción.
//  *       404:
//  *         description: No se encontró la persona con el ID proporcionado.
//  *       500:
//  *         description: Error interno del servidor.
//  */

peopleRouter.post('/people/options', postPeopleOptionsController);
/**
 * @swagger
 * /people/options:
 *   post:
 *     summary: Crear una nueva opción para una persona.
 *     tags:
 *       - People Options
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               idPeople:
 *                 type: string
 *                 description: ID de la persona asociada a la opción.
 *               idOption:
 *                 type: integer
 *                 description: ID de la opción.
 *               price:
 *                 type: number
 *                 description: Precio de la opción.
 *               institution:
 *                 type: string
 *                 description: Institución relacionada con la opción.
 *               year:
 *                 type: integer
 *                 description: Año relacionado con la opción.
 *               comment:
 *                 type: string
 *                 description: Comentario relacionado con la opción.
 *             required:
 *               - idPeople
 *               - idOption
 *     responses:
 *       201:
 *         description: Opción creada exitosamente.
 *       200:
 *         description: Opción actualizada exitosamente.
 *       400:
 *         description: Error en los datos de la opción.
 *       404:
 *         description: El ID de la opción no corresponde a ninguna opción existente.
 *       500:
 *         description: Error interno del servidor.
 */

peopleRouter.delete('/people/options', deletePeopleOptionsContoller);
/**
 * @swagger
 * /people/options:
 *   delete:
 *     summary: Eliminar opciones asociadas a un usuario.
 *     tags:
 *       - People Options
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               idPeople:
 *                 type: string
 *                 description: ID del usuario.
 *               idOption:
 *                 type: integer
 *                 description: ID de la opción a eliminar.
 *     responses:
 *       200:
 *         description: Opción eliminada exitosamente.
 *       400:
 *         description: Error en los datos de la solicitud.
 *       401:
 *         description: No autorizado para eliminar la opción.
 *       404:
 *         description: No se encontraron registros para eliminar.
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
 *       - People Auth
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

peopleRouter.put('/people/logout', logoutPeopleController);
/**
 * @swagger
 * /people/logout:
 *   put:
 *     summary: Cerrar sesión de usuario.
 *     tags:
 *       - People Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               idPeople:
 *                 type: string
 *                 description: Identificador de la persona.
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente.
 *         content:
 *       400:
 *         description: Faltan datos requeridos o incorrectos en la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */

module.exports = peopleRouter;
