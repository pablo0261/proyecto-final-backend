const { ValidationsError, notFoundError } = require('../../errors');
const deleteCategoriesOptionsService = require('../../services/categories_options/deleteCategoriesOptions.service');

const deleteCategoriesOptionsController = async (req, res) => {
  try {
    const { idOption } = req.body;

    const response = await deleteCategoriesOptionsService(idOption);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ValidationsError) {
      return res.status(400).json({ error: error.message });
    }

    if (error instanceof notFoundError) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = deleteCategoriesOptionsController;
