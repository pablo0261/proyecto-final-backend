const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'people_options',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      idPeople: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      idOption: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
      },
      date: {
        type: DataTypes.DATE,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      institution: {
        type: DataTypes.STRING,
      },
      comment: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['idPeople'],
        },
        {
          unique: false,
          fields: ['idOption'],
        },
        {
          unique: true,
          fields: ['idPeople', 'idOption'],
        },
      ],
    }
  );
};
