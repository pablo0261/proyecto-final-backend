const { updatePaidMembershipsService } = require('../../services/payments/updatePaidMemberships.service.js');

const updatePaidMembershipsController = async (req, res) => {
    const params = req.body;
    const { idPayment } = params;

    if (!idPayment) return res.status(400).json({ error: 'Falta el id de la pagamiendo' })

    try {

        const { result } = await updatePaidMembershipsService(params);
        

        if (!result) {
            return res.status(204).json({ error: 'No hay registros con ese idPeople.' });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log("controller: ", error);
        return res.status(500).json({ error: error.message });

    }

}

module.exports = updatePaidMembershipsController;