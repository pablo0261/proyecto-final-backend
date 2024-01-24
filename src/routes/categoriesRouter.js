const { Router } = require('express');

// controllers
const getCategories = require('../controllers/categories/getCategories.controller');
const postCategories = require('../controllers/categories/postCategories.controller');

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', postCategories);

module.exports = categoriesRouter;
