const { People } = require("../../db.js");

const getPeopleService = async () => {
    try {
        const result = await People.findAll();

        const count = result.length;
        const salida={
            count:count,
            data:result}
            
        return { salida };
    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

module.exports = { getPeopleService }