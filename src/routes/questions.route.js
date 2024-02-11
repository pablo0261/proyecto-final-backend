const { Router } = require("express");

const postQuestions = require("../controllers/questions/postQuestions.controller");

const questionsRouter = Router();

questionsRouter.post("/questions", postQuestions);

module.exports = questionsRouter;