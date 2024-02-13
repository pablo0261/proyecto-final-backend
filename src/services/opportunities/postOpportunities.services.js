const { v4: uuidv4 } = require('uuid');
const { Opportunities } = require('../../db');
const { STATE_VIEW } = require('../../constants');
const { Sequelize, Op } = require("sequelize");

const postOpportunitiesService = async (params) => {
    try {
        const { idCustomer, idProvider, } = params

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        if (!idCustomer) return { result: { message: 'Falta id de Cliente' }, status: 400 }
        if (!idProvider) return { result: { message: 'Falta id de Proveedor' }, status: 400 }

        const idOpportunitie = uuidv4()
        const [result, created] = await Opportunities.findOrCreate({
            where: {
                //no dar de alta una nueva si ya existe una vie de ese cliente con ese proveedor en esa fecha
                [Sequelize.Op.and]: [
                    {
                        state: STATE_VIEW
                    },
                    {
                        idCustomer: idCustomer
                    },
                    {
                        idProvider: idProvider
                    },
                    {
                        dateView: {
                            [Sequelize.Op.and]: [
                                Sequelize.literal(`EXTRACT(YEAR FROM "dateView") = ${currentYear}`),
                                Sequelize.literal(`EXTRACT(MONTH FROM "dateView") = ${currentMonth}`),
                                Sequelize.literal(`EXTRACT(DAY FROM "dateView") = ${currentDay}`),
                            ]
                        }
                    },
                ]
            },
            defaults: {
                idOpportunitie,
                idCustomer,
                idProvider,
                dateView: currentDate,
                state: STATE_VIEW
            },
        });

        return { result, created };

    } catch (error) {
        throw error
    };
}


module.exports = { postOpportunitiesService };
