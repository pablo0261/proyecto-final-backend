const { Router } = require("express");
const router = Router();

const categoriesRouter = require("./categories.route.js");
const peopleRouter = require("./people.route.js");
const geolocationRouter = require("./geolocation.route.js");
const opportunitiesRouter = require("./opportunities.route.js");
const paymentsRouter = require('./payments.route.js');
const chatsRouter = require("./chats.route.js");

router.use(categoriesRouter);
router.use(peopleRouter);
router.use(geolocationRouter);
router.use(opportunitiesRouter); 
router.use(paymentsRouter);
router.use(chatsRouter)

module.exports = router;
