const { People } = require("../../db.js");

const getPeopleByIdService = async (id) => {
    try {
        const result = await People.findAll({
            where: {
                idPeople: id
            }
        });

        const count = result.length;

        return { count, result };
    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

module.exports = { getPeopleByIdService }