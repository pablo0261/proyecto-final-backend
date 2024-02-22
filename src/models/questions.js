const { DataTypes } = require('sequelize');
const { TYPE_OF_QUESTION_FAQ, TYPE_OF_QUESTION_QAA, USER_ADMINISTRATOR, USER_CUSTOMER, USER_PROVIDER, USER_EXTERNAL, QUESTION_STATUS_PENDING, QUESTION_STATUS_COMPLETED, QUESTION_STATUS_DELETED } = require('../constants');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('questions', {
        idQuestion: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        typeOfQuestion: {
            type: DataTypes.ENUM(TYPE_OF_QUESTION_FAQ, TYPE_OF_QUESTION_QAA),
            allowNull: false,
        },
        destination: {
            type: DataTypes.ENUM(USER_ADMINISTRATOR, USER_CUSTOMER, USER_PROVIDER, USER_EXTERNAL),
            allowNull: false,
        },
        priority: {
            type: DataTypes.INTEGER
        },
        senderMail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        receiverMail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        response: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: 'pendiente'
        },
        dateMessage: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dateResponse: {
            type: DataTypes.DATE,
            allowNull: true
        },
        questionStatus: {
            type: DataTypes.ENUM(QUESTION_STATUS_PENDING, QUESTION_STATUS_COMPLETED, QUESTION_STATUS_DELETED),
            defaultValue: QUESTION_STATUS_PENDING,
            allowNull: false
        }
    })
};
