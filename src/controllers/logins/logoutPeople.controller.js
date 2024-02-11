const logoutPeopleService = require('../../services/logins/logoutPeople.service.js');

const logoutPeopleController = async (req, res) => {
    const { idPeople } = req.body;

    if (!idPeople) {
        return res.status(400).json({ error: 'Falta el id de la persona.' });
    }

    try {
        const result = await logoutPeopleService(idPeople);
        if(result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }

}

module.exports = logoutPeopleController;