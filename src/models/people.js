const { DataTypes, INTEGER } = require('sequelize');
const { USER_CUSTOMER, USER_PROVIDER, USER_ADMINISTRATOR,
    PEOPLE_STATE_ACTIVE, PEOPLE_STATE_DELETED, PEOPLE_STATE_INACTIVE, PEOPLE_STATE_UNVERIFIED } = require('../constants');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('people', {
        idPeople: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        fullName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        idLocation: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 999999
        },
        geoposition: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '-31.416668,-64.183334'
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        idGenre: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        state: {
            type: DataTypes.ENUM,
            values: [PEOPLE_STATE_ACTIVE, PEOPLE_STATE_DELETED, PEOPLE_STATE_INACTIVE, PEOPLE_STATE_UNVERIFIED],
            allowNull: false,
        },
        aboutMe: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        dateOfAdmission: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        typeOfPerson: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: [USER_ADMINISTRATOR, USER_CUSTOMER, USER_PROVIDER]
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        externalLogin: {
            type: DataTypes.STRING,
        },
        averageRating: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: true,
            defaultValue: 0
        },
        countRating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        weekCalendar: {
            type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logged: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
    },
        {
            indexes: [
                {
                    unique: false,
                    fields: ['fullName']
                },
                {
                    unique: false,
                    fields: ['externalLogin']
                },
                {
                    unique: false,
                    fields: ['idLocation']
                },
                {
                    unique: false,
                    fields: ['idGenre']
                },
                {
                    unique: true,
                    fields: ['email']
                },
            ]
        });


};
