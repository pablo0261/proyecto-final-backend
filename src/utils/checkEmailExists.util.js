const { People } = require("../db.js");

const checkEmailExists = async (email) => {
    try {
        const user = await People.findOne({
            where: { email: email }
        });

        return !!user;
    } catch (error) {
        throw error; 
    }
}

module.exports = { checkEmailExists };
