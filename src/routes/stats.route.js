const { Router } = require('express');

const { getLandingStatsController } = require("../controllers/stats/getLandingStats.controller");
const { getProviderStatsController } = require("../controllers/stats/getProviderStats.controller");
const { getCustomerStatsController } = require("../controllers/stats/getCustomerStats.controller");
const { getAdministratorStatsController } = require("../controllers/stats/getAdministratorStats.controller");

const statsRouter = Router();

statsRouter.get('/stats/landing', getLandingStatsController);

statsRouter.get('/stats/provider', getProviderStatsController);

statsRouter.get('/stats/customer', getCustomerStatsController);

statsRouter.get('/stats/administrator', getAdministratorStatsController);


module.exports = statsRouter;