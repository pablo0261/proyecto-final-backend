const { Categories_options } = require("../../db");

const postCategoriasOptionsService = async (categoriesData) => {
  const CategoriesOptionsData = await Categories_options.findOrCreate({
    where: { idCategorie: categoriesData.idCategorie },
    defaults: categoriesData,
  });

  return CategoriesOptionsData;
};

module.exports = postCategoriasOptionsService;
