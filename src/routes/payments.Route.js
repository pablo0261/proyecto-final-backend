const { Router } = require('express');
const createPreference = require('../controllers/payments/createPreference.controller.js');


const paymentsRouter = Router();

paymentsRouter.post('/payments', createPreference);


module.exports = paymentsRouter;