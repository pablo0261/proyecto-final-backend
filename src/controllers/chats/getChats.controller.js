const getChatsService = require("../../services/chats/chats.service");

const getChats = async (req, res) => {
  try {
    const chatsData = await getChatsService();

    if (!chatsData) {
      res.status(404).json({ error: "No hay datos en chats" });
      return;
    }

    res.status(200).json(chatsData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getChats;