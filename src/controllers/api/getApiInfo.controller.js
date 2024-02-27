const {
    CATEGORIES,
    CHATS,
    GEOLOCATION,
    OPPORTUNITIES,
    PAYMENTS,
    PEOPLE,
    QUESTIONS,
    SEND_MAIL,
    STATS
} = require('../../constants/index');

const getApiInfoController = async (req, res) => {
    try {
        const apiInfo = {
           categories: CATEGORIES,
           chats: CHATS,
           geolocation: GEOLOCATION,
           opportunities: OPPORTUNITIES,
           payments: PAYMENTS,
           people: PEOPLE,
           questions: QUESTIONS,
           sendMail: SEND_MAIL,
           stats: STATS
        }

        return res.status(200).json(apiInfo);
    } catch (error) {
        return res.status(500).send("Internal server error.");
    }
}

module.exports = { getApiInfoController };