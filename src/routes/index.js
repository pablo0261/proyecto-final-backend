const { Router } = require("express");
const router = Router();

const categoriesRouter = require("./categoriesRouter.js");
const peopleRouter = require("./people.router.js");
const geolocationRouter = require("./geolocation.router.js");
const opportunitiesRouter = require("./opportunitiesRouter.js");

router.use(categoriesRouter);
router.use(peopleRouter);
router.use(geolocationRouter);
// router.use(opportunitiesRouter); 

module.exports = router;
