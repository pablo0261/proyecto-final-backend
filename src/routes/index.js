const { Router } = require("express");
const router = Router();

const apiRouter = require('./api.route.js');
const categoriesRouter = require("./categories.route.js");
const peopleRouter = require("./people.route.js");
const geolocationRouter = require("./geolocation.route.js");
const opportunitiesRouter = require("./opportunities.route.js");
const paymentsRouter = require("./payments.route.js");
const chatsRouter = require("./chats.route.js");
const questionsRouter = require("./questions.route.js");
const statsRouter = require("./stats.route.js");
const sendMailRouter = require("./sendMail.route.js");

router.use(apiRouter);
router.use(categoriesRouter);
router.use(peopleRouter);
router.use(geolocationRouter);
router.use(opportunitiesRouter);
router.use(paymentsRouter);
router.use(chatsRouter);
router.use(questionsRouter);
router.use(statsRouter);
router.use(sendMailRouter)

module.exports = router;
