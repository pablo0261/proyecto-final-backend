const deleteCategoriesOptionsService = require('../../services/categories_options/deleteCategoriesOptions.service');

const deleteCategoriesOptionsController = async (req, res) => {
  try {
    // res.status(200).json({ response: 'ser recive la peticion' });
    const { idOption } = req.body;
    const response = await deleteCategoriesOptionsService(idOption);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = deleteCategoriesOptionsController;
