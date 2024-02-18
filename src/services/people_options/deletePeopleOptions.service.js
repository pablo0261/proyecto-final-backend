const { People_options } = require('../../db');
const { checkUnverified } = require('../people/checkUnverified');
const { getPeopleService } = require('../people/getPeople.service');

const deletePeopleOptionsService = async ({ idPeople, idOption }) => {
  const [numOfRowsDeleted] = await People_options.update(
    { isDeleted: true },
    { where: { idPeople, idOption } }
  );

  if (numOfRowsDeleted === 0) {
    return { status: 404, response: { response: 'No hay registros' } };
  }

  await checkUnverified(idPeople)
  
  const people = await getPeopleService({ idPeople });

  return people
    ? { status: 200, response: people }
    : { status: 500, response: { response: 'Error al devolver datos' } };
};

module.exports = deletePeopleOptionsService;
