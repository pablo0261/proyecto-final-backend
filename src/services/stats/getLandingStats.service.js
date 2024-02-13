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
        const oportunidadesAceptadas = 90;
        const cantidadDeOportunidades = 200;
        const successfulConnections = (oportunidadesAceptadas / cantidadDeOportunidades) * 100;

        const services = 526;
        const families = 2581;
        const providers = 1896;


        return data = { successfulConnections, services, families, providers };

    } catch (error) {
        console.log("LandingStats: ", error);
        throw error;
    }
}

module.exports = { getLandingStatsService };