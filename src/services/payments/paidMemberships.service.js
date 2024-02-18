const { Payments, sequelize } = require('../../db.js');
const { Op } = require('sequelize');

const paidMembershipsService = async (filter) => {

    try {
        const countNullPaymentDay = await Payments.count({
            where: {
                paymentDay: null
            }
        });

        const payment = await Payments.findOne({
            attributes: ['price'],
            where: {
                paymentDay: null
            }
        });

        const fixedPrice = payment ? payment.price : 0;
        const countTimesPrice = countNullPaymentDay * fixedPrice;

        const nullPaymentDayRecords = await Payments.findAll({
            where: {
                paymentDay: null
            }
        });



        const info = {
            count: countNullPaymentDay,
            total: countTimesPrice,
            data: nullPaymentDayRecords
        }

        return info;


    } catch (error) {
        console.log("service: ", error);
        throw error;
    }

}


module.exports = { paidMembershipsService };