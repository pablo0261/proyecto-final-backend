const { People } = require("../../db.js");

const getPeopleFilterService = async (type) => {

    try {
        const result = await People.findAll({
            where: {
                typeOfPerson: `${type}`
            }
        });

        const people={
            count:result.length,
            data:result}
            
        return { people };

    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

module.exports = { getPeopleFilterService }