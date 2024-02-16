const { Categories, Categories_options } = require('../../db');
const { Op } = require('sequelize');
const { notFoundError, ValidationsError } = require('../../errors');

const getCategoriesServise = async (parameters = {}) => {
  //
  // filtros
  const categoryFilters = [];
  const optionFilters = {};

  Object.entries(parameters).map(([key, value]) => {
    const obj = {};
    if (value) {
      if (key === 'description') return categoryFilters.push({ description: { [Op.iLike]: value } });
      if (key !== 'isDeleted') {
        obj[key] = value;
        return categoryFilters.push(obj);
      }
    }
  });

  // filtro por opciones borradas
  let { isDeleted } = parameters;
  if (isDeleted) {
    if (isDeleted === 'false') isDeleted = false;
    if (isDeleted === 'true') isDeleted = true;
    if (typeof isDeleted !== 'boolean') throw new ValidationsError('isDeleted debe ser true o false');
    optionFilters.isDeleted = isDeleted;
  }

  const categoriesData = await Categories.findAll({
    where: { [Op.and]: categoryFilters },
    include: {
      model: Categories_options,
      where: optionFilters,
      attributes: ['idOption', 'description', 'isDeleted'],
    },
  });

  if (!categoriesData[0]) {
    // return { status: 404, response: 'Sin ningun resultado' };
    throw new notFoundError('Sin ningun resultado');
  }

  const count = categoriesData.length;
  const categories = {
    count,
    filters: parameters,
    data: categoriesData,
  };
  return { categories };
};

module.exports = getCategoriesServise;
