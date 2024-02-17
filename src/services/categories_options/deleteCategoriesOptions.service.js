const { Categories_options } = require('../../db');
const { ValidationsError, notFoundError } = require('../../errors');
const getCategoriesServise = require('../categories/getCategories.service');

const deleteCategoriesOptionsService = async (idOption) => {
  if (!idOption) throw new ValidationsError('Falta el id de la opcion');

  const [numOfRowsUpdated] = await Categories_options.update(
    { isDeleted: true },
    { where: { idOption, isDeleted: false } }
  );

  if (numOfRowsUpdated === 0) throw new notFoundError('La categoria ya fue eliminada o no existe');

  // devuelve el formato de categorias
  const categories = await getCategoriesServise();

  return categories;
};

module.exports = deleteCategoriesOptionsService;
