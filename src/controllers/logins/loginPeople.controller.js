const loginPeopleService = require('../../services/logins/loginPeople.service');
const { getPeopleService } = require('../../services/people/getPeople.service');

const loginPeopleController = async (req, res) => {
  const { email, password } = req.body;
  

  if (!email) return res.status(400).json({ error: 'Falta email' });
  if (!password) return res.status(400).json({ error: 'Falta password' });

  const idPeople = await loginPeopleService(email, password);
  if (!idPeople) {
    return res.status(400).json({ error: 'email o contraseña incorrectos' });
  }
  const data = await getPeopleService({ idPeople });
  return res.status(200).json(data);
};

module.exports = loginPeopleController;
