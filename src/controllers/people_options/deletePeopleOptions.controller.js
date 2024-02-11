const deletePeopleOptionsService = require('../../services/people_options/deletePeopleOptions.service');

const deletePeopleOptionsContoller = async (req, res) => {
  try {
    const { idPeople, idOption } = req.body;
    if (!idPeople || !idOption) {
      return res.status(400).json({ response: 'Faltan datos requeridos' });
    }

    const { status, response } = await deletePeopleOptionsService({ idPeople, idOption });

    res.status(status).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deletePeopleOptionsContoller;
