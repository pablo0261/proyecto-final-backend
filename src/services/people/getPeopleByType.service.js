const { People } = require("../../db.js");

const getPeopleByTypeService = async (type) => {
    try {
        const result = await People.findAll({
            where: {
                typeOfPerson: type
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