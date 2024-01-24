const { People } = require("../../db.js");

const getPeopleByIdService = async (id) => {
    console.log(id)
    try {
        const result = await People.findAll({
            where: {
                idPeople: id
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

module.exports = { getPeopleByIdService }