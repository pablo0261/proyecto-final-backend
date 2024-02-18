const { paidMembershipsService } = require('../../services/payments/paidMemberships.service.js');

const paidMembershipsController = async (req, res) => {
    const filter = req.query;

    try {

        const data = await paidMembershipsService(filter);

        if (!data) {
            return res.status(204).json({ error: 'No hay registros con ese idPeople.' });
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }

}

module.exports = paidMembershipsController;