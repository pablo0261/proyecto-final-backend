const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('opportunities', {
    idOpportunities: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    idCustomer: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    idProvider: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dateQuery: {
      type: DataTypes.DATE,
    },
    idService: {
      type: DataTypes.INTEGER,
    },
    dateHiring: {
      type: DataTypes.DATE,
    },
    dateEstimateCompletion: {
      type: DataTypes.DATE,
    },
    prize: {
      type: DataTypes.DECIMAL(12, 2)
    },
    dateOk: {
      type: DataTypes.DATE,
    },
    dateCancelled: {
      type: DataTypes.DATE,
    },
    idPeopleCancelled: {
      type: DataTypes.UUID,
    },
    Reason: {
      type: DataTypes.STRING,
    },
    DateServiceEnd: {
      type: DataTypes.DATE,
    },
    ratingCustomer: {
      type: DataTypes.DECIMAL(2),
    },
    ratingProvider: {
      type: DataTypes.DECIMAL(2),
    },
    reviewCustomer: {
      type: DataTypes.TEXT,
    },
    reviewProvider: {
      type: DataTypes.TEXT,
    },
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['idCustomer']
        },
        {
          unique: false,
          fields: ['idProvider']
        },
        {
          unique: false,
          fields: ['idService']
        },
        {
          unique: false,
          fields: ['idPeopleCancelled']
        },
      ]
    });
};
