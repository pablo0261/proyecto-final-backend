const { Categories_options, Categories } = require('../../db');
const { Op } = require('sequelize');
const { ValidationsError, notFoundError } = require('../../errors');

const getCategoriesOption = async (parameters = {}) => {
  //
  // array de filtros
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

  const categoriesOptionsData = await Categories_options.findAll({
    where: optionFilters,
    include: {
      model: Categories,
      where: { [Op.and]: categoryFilters },
      attributes: ['description'],
    },
  });

  if (!categoriesOptionsData[0]) throw new notFoundError('Sin ningun resultado');

  const count = categoriesOptionsData.length;
  const categoriesOptions = {
    count,
    filters: parameters,
    data: categoriesOptionsData,
  };
  return { categoriesOptions };
};

module.exports = getCategoriesOption;
