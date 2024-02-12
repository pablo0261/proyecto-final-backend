const { Router } = require('express');

const { postOpportunitiesController } = require('../controllers/opportunities/postOpportunities.controller');
const { putOpportunitiesController } = require('../controllers/opportunities/putOpportunities.controller');
const { getOpportunitiesController } = require('../controllers/opportunities/getOpportunities.controller');

// controllers

const opportunitiesRouter = Router();

opportunitiesRouter.get('/opportunities', getOpportunitiesController);
/**
 * @swagger
 * /opportunities:
 *   get:
 *     summary: Obtener las oportunidades.
 *     description: |
 *       Obtien todas las oportunidades que existen registradas o segun el status enviado por parametro.
 *     tags:
 *       - Opportunities
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: | 
 *           Los estados pueden ser: view, pending, accepted, cancelled, ratingPending, ratingCustomerPending, ratingProviderPending, completed
 *     responses:
 *       200:
 *         description: |
 *           Desvuelve todas las oportunidades que hay segun el status enviado por parametro, si no se envia un status como parametro para filtrar, se devulve todas las oportunidades que hay en la base de datos.
 *       500:
 *         description: Error interno del servidor.
 */

opportunitiesRouter.post('/opportunities', postOpportunitiesController);

opportunitiesRouter.put('/opportunities', putOpportunitiesController);

module.exports = opportunitiesRouter;
