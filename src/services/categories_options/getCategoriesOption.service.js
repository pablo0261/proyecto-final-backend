const { Categories_options } = require("../../db");

const getCategoriesOption = async () => {
  const categoriesOptionsData = await Categories_options.findAll();
  return categoriesOptionsData;
};

module.exports = getCategoriesOption