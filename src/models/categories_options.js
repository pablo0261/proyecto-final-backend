const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('categories_options', {
        idOption: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idCategorie: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue:false
        },
    },
        {
            indexes: [
                {
                    unique: false,
                    fields: ['description']
                },
                {
                    unique: true,
                    fields: ['description', 'idCategorie']
                },
                {
                    unique: false,
                    fields: ['idCategorie']
                },
            ]
        });
};
