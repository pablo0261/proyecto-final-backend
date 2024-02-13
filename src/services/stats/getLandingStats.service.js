const {
    People,
    People_options,
    Categories,
    Categories_options,
    People_logins,
    Opportunities,
    Payments,
} = require("../../db.js");

const getLandingStatsService = async () => {
    
    try {
        // code
    } catch (error) {
        console.log("LandingStats: ", error);
        throw error;
    }
}

module.exports = { getLandingStatsService };