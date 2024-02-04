const { getPeopleService } = require('../../services/people/getPeople.service.js');

const getPeopleController = async (req, res) => {
  try {
    const people = await getPeopleService(req.query);

    if (people) {
      return res.status(200).json(people);
    }

    return res.status(404).send('No hay registro de personas.');

  } catch (error) {
    return res.status(500).send("Error interno del servidor.");
  }
};

module.exports = { getPeopleController };
