const { Payments } = require('../../db.js');

const paidMembershipsService = async (filter) => {
    try {
        if (!filter) {
            const count = await Payments.count({ where: { paymentDay: null } });

            const result = await Payments.findOne({
                attributes: [
                    [sequelize.fn('sum', sequelize.col('price')), 'total']
                ],
                where: { paymentDay: null }
            });

            const total = result.dataValues.total;

            const paymentDays = await Payments.findAll({
                attributes: ['paymentDay']
            });

            const paymentDaysArray = paymentDays.map(payment => payment.paymentDay);

            const data = {
                count,
                total,
                paymentDays: paymentDaysArray
            };

            return data;
        } else {
            // Handle case where filter is provided
            // Add your logic here if needed
        }

    } catch (error) {
        console.log("service: ", error);
        throw error;
    }
}


module.exports = { paidMembershipsService };