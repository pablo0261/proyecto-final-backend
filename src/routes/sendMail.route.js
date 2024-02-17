const { Router } = require("express");
const { sendMailController } = require("../controllers/sendMail/sendMail.controller");


const sendMailRouter = Router();

sendMailRouter.post("/sendmail", sendMailController);

module.exports = sendMailRouter;
