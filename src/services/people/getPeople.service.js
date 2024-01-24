const { People } = require("../../db.js");

const getPeopleService = async () => {
    try {
        const result = await People.findAll();

        const count = result.length;
        const people={
            count:count,
            data:result}
            
        return { people };
    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

module.exports = { getPeopleService }