const { People } = require("../../db.js");

const getPeopleFilterService = async (query) => {
    
    try {
        const result = await People.findAll({
            where: query
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