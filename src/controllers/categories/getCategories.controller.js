const getCategoriesServise = require('../../services/categories/getCategories.service');

const getCategories = async (req, res) => {
  try {
    const data = await getCategoriesServise();
    if (!data) {
      res.status(204).json({ error: 'No hay datos' });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCategories;
