const { Questions } = require("../../db");
const { v4: uuidv4 } = require('uuid'); // Importa la función para generar UUIDs

const createQuestion = async (typeOfQuestion, destination, priority, senderMail, fullName, title, receiverMail, message, response) => {
    try {
        // Genera un UUID para idQuestion
        const idQuestion = uuidv4();

        // Crea la pregunta con el UUID generado
        const newQuestion = await Questions.create({
            idQuestion, // Asigna el UUID generado
            typeOfQuestion,
            destination,
            priority,
            senderMail,
            fullName,
            title,
            receiverMail,
            message,
            response
        });

        return newQuestion;
    } catch (error) {
        console.error('Error creating question:', error);
        throw new Error('Internal server error');
    }
}

module.exports = createQuestion;
