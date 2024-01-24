const { Categories } = require('../../db');

const getCategoriesServise = async () => {
  const categoriesData = await Categories.findAll();
  return categoriesData;
};

module.exports = getCategoriesServise;
