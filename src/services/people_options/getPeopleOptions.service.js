const { People_options } = require("../../db.js");

const getPeopleOptionsService = async (idPeople) => {
    try {
        const result = await People_options.findAll({
            where: {
                idPeople: idPeople
            }
        });

        const peopleOptions = {
            count: result.length,
            data: result
        }

        return peopleOptions;

    } catch (error) {
        throw error;
    }
}

module.exports = { getPeopleOptionsService }