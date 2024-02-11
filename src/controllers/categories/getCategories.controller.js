const getCategoriesServise = require('../../services/categories/getCategories.service');

const getCategories = async (req, res) => {
  try {
    const { description, idCategorie } = req.body;

    if (description || idCategorie) {
      const { status, response } = await getCategoriesServise({ description, idCategorie });
      return res.status(status).json(response);
    }

    const { status, response } = await getCategoriesServise();
    return res.status(status).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCategories;
