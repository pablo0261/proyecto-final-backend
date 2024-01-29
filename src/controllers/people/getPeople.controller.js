const { getPeopleService } = require("../../services/people/getPeople.service.js");
const loginPeopleService = require('../../services/people/loginPeople.service.js');

const getPeopleController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email || password) {
      if (!email) return res.status(400).json({ error: 'Falta email' });
      if (!password) return res.status(400).json({ error: 'Falta password' });

      const response = await loginPeopleService(email, password);
      if (!response) {
        return res
          .status(400)
          .json({ error: 'email o contraseña incorrectos' });
      }
      const people = await getPeopleService({ idPeople: response });
      return res.status(200).json(people);
    }
    
    const people = await getPeopleService(req.query);

    if (!people) {
      return res.status(404).send('No hay registro de personas.');
    }

    return res.status(200).json(people);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { getPeopleController };


