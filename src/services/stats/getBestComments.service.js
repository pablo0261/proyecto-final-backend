const { Sequelize, Op } = require("sequelize");
const {
    People,
    People_options,
    Categories,
    Categories_options,
    People_logins,
    Opportunities
} = require("../../db.js");

const { formatDate } = require("../../utils/formatDate.js");
const { USER_PROVIDER, USER_CUSTOMER } = require("../../constants/index.js");

const getBestCommentsService = async (idPeople, typeOfPerson) => {

    try {
        let type = ''
        if (idPeople) {
            const people = await People.findByPk(idPeople)
            console.log(people)
            type = people.typeOfPerson
        } else {
            if (typeOfPerson) {
                type = typeOfPerson
            } else {
                type = USER_PROVIDER
            }
        }
        let rating = ''
        let dateRating = ''
        let review = ''
        if (type === USER_PROVIDER) {
            rating = 'ratingCustomer'
            dateRating = 'dateRatingCustomer'
            review = 'reviewCustomer'
        }

        //mejores comentarios
        let whereBestComment = {}
        if(idPeople){
            if (type === USER_PROVIDER) whereBestComment.idProvider = idPeople
            if (type === USER_CUSTOMER) whereBestComment.idCustomer = idPeople
        }

        const query = await Opportunities.findAll({
                attributes: [
                    [rating, 'rating'],
                    [dateRating, 'fecha'],
                    [review, 'review'],
                    [Sequelize.literal('"categories_option"."description"'), 'service'],
                    [Sequelize.literal(`"${type}"."fullName"`), 'persona'],
                    [Sequelize.literal(`"${type}"."image"`), 'imagen'],

                ],
                limit: 3,
                where: whereBestComment,
                include: [
                    {
                        model: Categories_options,
                        as: 'categories_option',
                    },
                    {
                        model: People,
                        as: type === USER_PROVIDER ? USER_CUSTOMER : USER_PROVIDER,
                    }
                ],
                order: [[rating, 'DESC']]
            });

        console.log(query)            
        const bestComment = {
            
        }


        //salida
        const data = {
            comentarios: bestComment
        }
        return { data }

    } catch (error) {
        console.log("ProviderStats: ", error);
        throw error;
    }
}

module.exports = { getBestCommentsService };
