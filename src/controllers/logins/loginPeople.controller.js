const loginPeopleService = require('../../services/logins/loginPeople.service');
const { getPeopleService } = require('../../services/people/getPeople.service');
const { authenticateUser } = require("../../utils/authenticateUser.util");

const loginPeopleController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Falta email o contraseña' });
        }

        const authenticatedPerson = await authenticateUser(email, password);

        if (!authenticatedPerson) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const idPeople = await loginPeopleService(authenticatedPerson);

        const data = await getPeopleService({ idPeople });
        return res.status(200).json(data);
    } catch (error) {
        if (error.message) {
            return res.status(401).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = loginPeopleController;
