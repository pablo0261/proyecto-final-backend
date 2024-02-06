const { Router } = require('express');
const paymentController = require('../controllers/payments/payment.controller.js');
const receiveWebhookController = require('../controllers/payments/receiveWebhook.controller.js');
const successController = require('../controllers/payments/success.controller.js')

const paymentsRouter = Router();

paymentsRouter.post('/payment', paymentController);
paymentsRouter.get('/success', successController);
paymentsRouter.get('/failure', (req, res) => res.send("failure"));
paymentsRouter.get('/pending', (req, res) => res.send("pending"));
paymentsRouter.get('/webhook', receiveWebhookController);





module.exports = paymentsRouter;