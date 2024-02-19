const { Router } = require('express');

const postQuestionsController = require('../controllers/questions/postQuestions.controller');
const getQuestionsController = require('../controllers/questions/getQuestions.controller');
const putQuestionsController = require('../controllers/questions/putQuestions.controller');
const deleteQuestionsController = require('../controllers/questions/deleteQuestions.controller');

const questionsRouter = Router();

questionsRouter.post('/questions', postQuestionsController);
questionsRouter.get('/questions', getQuestionsController);
questionsRouter.put('/questions', putQuestionsController);
questionsRouter.delete('/questions/:idQuestion', deleteQuestionsController)

module.exports = questionsRouter;
