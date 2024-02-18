const { Router } = require('express');
const paymentController = require('../controllers/payments/payment.controller.js');
const receiveWebhookController = require('../controllers/payments/receiveWebhook.controller.js');
const paidMembershipsController = require('../controllers/payments/paidMemberships.controller');
const updatePaidMembershipsController = require('../controllers/payments/updatePaidMemberships.controller');

const paymentsRouter = Router();

paymentsRouter.post('/payment', paymentController);
paymentsRouter.post('/webhook', receiveWebhookController);
paymentsRouter.get('/paidMemberships', paidMembershipsController);
paymentsRouter.put('/paidMemberships', updatePaidMembershipsController);


module.exports = paymentsRouter;