const { Router } = require('express');

const { getLandingStatsController } = require("../controllers/stats/getLandingStats.controller");
const { getProviderStatsController } = require("../controllers/stats/getProviderStats.controller");
const { getCustomerStatsController } = require("../controllers/stats/getCustomerStats.controller");
const { getAdministratorStatsController } = require("../controllers/stats/getAdministratorStats.controller");
const { getBestCommentsController } = require('../controllers/stats/getBestComments.controller');

const statsRouter = Router();

statsRouter.get('/stats/landing', getLandingStatsController);

statsRouter.get('/stats/provider', getProviderStatsController);

statsRouter.get('/stats/customer', getCustomerStatsController);

statsRouter.get('/stats/administrator', getAdministratorStatsController);

statsRouter.get('/stats/bestcomments', getBestCommentsController);

module.exports = statsRouter;