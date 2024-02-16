const { Router } = require('express');

// controllers
const { getProvincesController } = require("../controllers/geolocation/getProvinces.controller.js");
const { getMunicipalitiesController} = require("../controllers/geolocation/getMunicipalities.controller.js");

const geolocationRouter = Router();

geolocationRouter.get('/provinces', getProvincesController);
/**
* @swagger
* /provinces:
*   get:
*     summary: Obtener todas las provincias.
*     tags:
*       - Geolocation
*     responses:
*       200:
*         description: > 
*           Obtiene un objeto con dos propiedades: count y data.
*           count: contiene la cantidad de provincias registradas.
*           data: contiene un array de objetos, cada objeto contiene las informaciones de cada provincia.  
*       404:
*         description: No hay registro de provincias.
*       500:
*         description: Error interno del servidor.
*/

geolocationRouter.get('/municipalities', getMunicipalitiesController);
// /**
//  * @swagger
//  * /municipalities:
//  *   get:
//  *     summary: Obtener todos los municipios de una provincia específica.
//  *     tags:
//  *       - Geolocation
//  *     parameters:
//  *       - name: province
//  *         in: path
//  *         description: Nombre de la provincia.
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: > 
//  *           Obtiene un objeto con dos propiedades: count y data.
//  *           count: contiene la cantidad de municipios registrados para la provincia especificada.
//  *           data: contiene un array de objetos, cada objeto contiene un municipio y sus propiedades.  
//  *       404:
//  *         description: No hay registro de municipios para la provincia especificada.
//  *       500:
//  *         description: Error interno del servidor.
//  */


module.exports = geolocationRouter;