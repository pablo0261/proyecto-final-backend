const { People_options } = require('../../db');

const deletePeopleOptionsService = async ({ idPeople, idOption }) => {
  const [numOfRowsDeleted] = await People_options.update(
    { isDeleted: true },
    { where: { idPeople, idOption } }
  );

  if (numOfRowsDeleted === 0) {
    return { status: 404, response: 'No hay registros' };
  }

  return { status: 200, response: 'borrado carrectamente' };
};

module.exports = deletePeopleOptionsService;
