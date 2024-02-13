const { Router } = require('express');

const postQuestionsController = require('../controllers/questions/postQuestions.controller');
const getQuestionsController = require('../controllers/questions/getQuestions.controller');

const questionsRouter = Router();

questionsRouter.post('/questions', postQuestionsController);
questionsRouter.get('/questions', getQuestionsController);

module.exports = questionsRouter;
