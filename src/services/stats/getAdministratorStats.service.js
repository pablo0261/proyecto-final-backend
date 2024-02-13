const {
    People,
    People_options,
    Categories,
    Categories_options,
    People_logins,
    Opportunities,
    Payments,
} = require("../../db.js");

const getAdministratorStatsService = async () => {
    
    try {
        // code
    } catch (error) {
        console.log("AdministratorStats: ", error);
        throw error;
    }
}

module.exports = { getAdministratorStatsService };