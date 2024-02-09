const { Router } = require('express');
const paymentController = require('../controllers/payments/payment.controller.js');
const receiveWebhookController = require('../controllers/payments/receiveWebhook.controller.js');

const paymentsRouter = Router();

paymentsRouter.post('/payment', paymentController);
paymentsRouter.post('/webhook', receiveWebhookController);

module.exports = paymentsRouter;