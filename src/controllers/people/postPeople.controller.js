
const { postPeopleUtil } = require("../../utils/postPeople.util");
const { postPeopleService } = require('../../services/people/postPeople.service');

const postPeopleController = async (req, res) => {
    try {
        // Util
        const { params, errors } = await postPeopleUtil(req.body);

        if (errors) {
            return res.status(400).json(errors);
        }

        const { result, created } = await postPeopleService(params);

        if (created) {
            return res.status(201).json(result);
        }
        return res.status(200).json(result);

    } catch (error) {
        console.log("controller: ", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: "Ya existe un registro con el mismo idPeople o email." });
        }
        return res.status(500).json({ error: "Error interno del servidor." });
    }
};

module.exports = { postPeopleController };
