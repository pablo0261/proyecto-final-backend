const { Chats } = require("../../db");

const getChatsService = async () => {
  const chatsData = await Chats.findAll();
  return chatsData;
};

module.exports = getChatsService;
