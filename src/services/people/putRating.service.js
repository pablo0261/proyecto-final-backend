
const { Opportunities, People, conn } = require('../../db');
const { STATE_RATINGPROVIDERPENDING, STATE_RATINGCUSTOMERPENDING, STATE_COMPLETED, USER_CUSTOMER, USER_PROVIDER } = require('../../constants');

const putRatingService = async (idPeople) => {

    try {
        const people = await People.findByPk(idPeople)
        if (!people) return

        const filter = people.typeOfPerson === USER_CUSTOMER ? { idCustomer: idPeople, state: STATE_COMPLETED } : { idProvider: idPeople, state: STATE_COMPLETED }
        const field = people.typeOfPerson === USER_CUSTOMER ? 'ratingProvider' : 'ratingCustomer'

        const result = await Opportunities.findAll(
            {
                attributes: [
                    [conn.fn('AVG', conn.col(field)), 'averageRating'],
                    [conn.fn('COUNT', conn.col(field)), 'countRating']
                ]
            },
            { where: filter }
        );
        people.countRating = result[0].dataValues.countRating ? result[0].dataValues.countRating : 0
        people.averageRating = result[0].dataValues.averageRating ? result[0].dataValues.averageRating : 0
        await people.save()
        return {people}


    } catch (error) {
        throw error;
    };
}

module.exports = { putRatingService };
