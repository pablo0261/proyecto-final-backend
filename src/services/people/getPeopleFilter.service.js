const { People } = require("../../db.js");

const getPeopleFilterService = async (typeOfPerson) => {

    try {
        const result = await People.findAll({
            where: {
                typeOfPerson: 'customer'
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