const { Chats, Opportunities } = require('../../db');
const { v4: uuidv4 } = require('uuid');

const postChatsService = async (params) => {
    const { idOpportunitie, idPeople, message, isRating, isRated } = params
    try {
        const idChat = uuidv4()
        const dateMessage = new Date();

        const newData = {
            idChat,
            idOpportunitie,
            idPeople,
            message,
            isRating,
            isRated,
            dateMessage
        }
        const [chat, create] = await Chats.findOrCreate({
            where: { idChat },
            defaults: newData
        });

        return { chat, create };

    } catch (error) {
        return { error: error.message };

    };
}
module.exports = postChatsService;
