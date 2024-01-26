const { Router } = require('express');

// controllers
const { getProvincesController } = require("../controllers/geolocation/getProvinces.controller");
const { getMunicipalitiesController} = require("../controllers/geolocation/getMunicipalities.controller.js");

const geolocationRouter = Router();

geolocationRouter.get('/provinces', getProvincesController);

geolocationRouter.get('/provinces', getProvincesController);
geolocationRouter.get('/municipalities/:province', getMunicipalitiesController);



module.exports = geolocationRouter;