const { Router } = require("express");

const getChats = require("../controllers/chats/getChats.controller");

const chatsRouter = Router();

chatsRouter.get("/chats", getChats);

module.exports = getChats;
