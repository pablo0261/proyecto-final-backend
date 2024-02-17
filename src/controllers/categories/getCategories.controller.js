const { notFoundError, ValidationsError } = require('../../errors');
const getCategoriesServise = require('../../services/categories/getCategories.service');

const getCategories = async (req, res) => {
  try {
    const { description, idCategorie, isDeleted } = req.query;

    const response = await getCategoriesServise({ description, idCategorie, isDeleted });
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof notFoundError) {
      return res.status(404).json({ error: error.message });
    }

    if (error instanceof ValidationsError) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = getCategories;
