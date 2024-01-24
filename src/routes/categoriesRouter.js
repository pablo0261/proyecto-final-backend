const { Router } = require('express');

// controllers
const getCategories = require('../controllers/categories/getCategories.controller');
const postCategories = require('../controllers/categories/postCategories.controller');

const categoriesRouter = Router();

categoriesRouter.get('/', (req, res) => {
  try {
    const response = getCategories();
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

categoriesRouter.post('/', (req, res) => {
  try {
    const response = postCategories();
    res.status(201).json({ message: response });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

module.exports = categoriesRouter;
