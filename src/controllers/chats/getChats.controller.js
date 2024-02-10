const { getChatsService } = require("../../services/chats/getChats.service");

const getChatsController = async (req, res) => {
    try {
        const { idOpportunitie, idPeople } = req.query
        if (!idOpportunitie || !idPeople) return res.status(400).json({ error: "Faltan Datos." })

        const { chats } = await getChatsService(req.query);
     //   if (!chats || chats.count === 0) return res.status(404).json(chats);
        return res.status(200).json(chats);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
};

module.exports = { getChatsController }
