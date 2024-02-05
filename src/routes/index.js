const { Router } = require("express");
const router = Router();

const categoriesRouter = require("./categoriesRouter.js");
const peopleRouter = require("./people.router.js");
const geolocationRouter = require("./geolocation.router.js");
const opportunitiesRouter = require("./opportunitiesRouter.js");
const paymentsRouter = require('./payments.Route.js');
const chatsRouter = require("./chats.router.js");

router.use(categoriesRouter);
router.use(peopleRouter);
router.use(geolocationRouter);
router.use(opportunitiesRouter); 
router.use(paymentsRouter);
router.use(chatsRouter)

module.exports = router;
