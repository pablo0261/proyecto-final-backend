const { Op } = require('sequelize');
const {
    People,
    Categories_options,
    Opportunities,
} = require("../../db.js");

const getLandingStatsService = async () => {
    try {
        const opportunitiesCount = await Opportunities.count();
        const opportunitiesAccepted = await Opportunities.findAll({
            where: {
                state: {
                    [Op.notIn]: ['view', 'cancelled']
                }
            }
        });

        // Conexiones con exito
        const acceptedCount = opportunitiesAccepted.length;
        const successfulConnections = ((acceptedCount / opportunitiesCount) * 100).toFixed(2) + '%';

        // Cantidad de servicios
        const services = await Categories_options.count({
            where: {
                idCategorie: 1
            }
        });

        // Cantidad de clientes
        const customerCount = await People.count({
            where: {
                typeOfPerson: 'customer'
            }
        });

        // Cantidad de proveedores
        const providerCount = await People.count({
            where: {
                typeOfPerson: 'provider'
            }
        });


        return {
            successfulConnections, services, customerCount, providerCount
        }
    } catch (error) {
        console.log("LandingStats: ", error);
        throw error;
    }
}

module.exports = { getLandingStatsService };
