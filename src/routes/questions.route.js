const { Router } = require('express');

const postQuestionsController = require('../controllers/questions/postQuestions.controller');
const getQuestionsController = require('../controllers/questions/getQuestions.controller');
const putQuestionsController = require('../controllers/questions/putQuestions.controller');

const questionsRouter = Router();

questionsRouter.post('/questions', postQuestionsController);
questionsRouter.get('/questions', getQuestionsController);
questionsRouter.put('/questions', putQuestionsController);

module.exports = questionsRouter;
