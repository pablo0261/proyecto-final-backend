const { People, People_logins } = require('../../db.js');


const logoutPeopleService = async (idPeople) => {

    try {
        const person = await People.findOne({
            where: { idPeople }
        });

        console.log("TIAGO: ", person);

        if(!person) {
            return null;
        }






    } catch (error) {
        console.log(error);
    }
}

module.exports = logoutPeopleService;