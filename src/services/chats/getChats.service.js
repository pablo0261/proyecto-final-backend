const { Opportunities, Chats, Categories_options } = require("../../db.js");

const getChatsService = async (params) => {

    try {
        const { idOpportunitie, idPeople } = params

        const allChats = await Chats.findAll({
            attributes: ['dateMessage', 'isRating', 'isRated', 'message', 'idPeople'],
            where: {
                idOpportunitie: idOpportunitie
            },
            include: [
                {
                    model: Opportunities,
                    attributes: ['price'],
                    include: [
                        {
                            model: Categories_options,
                            attributes: ['description'],
                        }],
                }],

            order: ['dateMessage']

        });
        const result = allChats.map(chat => {
            console.log(chat.get())
            return {
                ...chat.get(),
                sended: chat.idPeople === idPeople,
            };
        });

        const chats = {
            count: result.length,
            data: result
        }

        return { chats };

    } catch (error) {
        throw error;
    }
}

module.exports = { getChatsService }