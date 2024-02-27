const { Router } = require('express');

const { getApiInfoController } = require('../controllers/api/getApiInfo.controller.js');

const getApiRouter = Router();

getApiRouter.get('/api', getApiInfoController);

module.exports = getApiRouter