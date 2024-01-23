const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categories', {
    idCategorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
    },
    isGenre: {
      type: DataTypes.BOOLEAN,
    },
    isEducation: {
      type: DataTypes.BOOLEAN,
    },
    isSkill: {
      type: DataTypes.BOOLEAN,
    },
    isService: {
      type: DataTypes.BOOLEAN,
    },
    includeCustomer: {
      type: DataTypes.BOOLEAN,
    },
    includeProvider: {
      type: DataTypes.BOOLEAN,
    },
  },
    {
      indexes: [
        {
          unique: true,
          fields: ['description']
        }
      ]
    });
};
