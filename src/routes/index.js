const { Router } = require("express");
const router = Router();

const categoriesRouter = require("./categoriesRouter.js");
const peopleRouter = require("./people.router.js");
const geolocationRouter = require("./geolocation.router.js");
const chats = require("./chats.router.js");

router.use(categoriesRouter);
router.use(peopleRouter);
router.use(geolocationRouter);
router.use(chats);

module.exports = router;
