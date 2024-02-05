const { v4: uuidv4 } = require('uuid');
const postChatsService = require('../../services/chats/postChats.service');

const postChatsController = async (req, res) => {
    const params = req.body
    const { idOpportunitie, idPeople, message } = req.body

    if (!idOpportunitie || !idPeople || !message) return res.status(400).json({ error: "Faltan Datos." })

    try {
        const { chat, created } = await postChatsService(req.body)

        if (created) {
            return res.status(201).json(chat)
        }
        return res.status(200).json(chat)

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { postChatsController };