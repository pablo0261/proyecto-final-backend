const { DataTypes, INTEGER } = require('sequelize');
const { STATE_ACCEPTED, STATE_CANCELLED, STATE_COMPLETED, STATE_PENDING, STATE_RATINGCUSTOMERPENDING, STATE_RATINGPENDING, STATE_RATINGPROVIDERPENDING, STATE_VIEW } = require('../constants');
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
    state:{
      type:DataTypes.ENUM,
      default:STATE_VIEW,
      values: [STATE_ACCEPTED,STATE_CANCELLED,STATE_COMPLETED,STATE_PENDING,STATE_RATINGCUSTOMERPENDING,STATE_RATINGPENDING,STATE_RATINGPROVIDERPENDING,STATE_VIEW]
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
    price: {
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
    reasonForCancelation: {
      type: DataTypes.STRING,
    },
    dateEndService: {
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
        {
          unique: false,
          fields: ['state']
        },
      ]
    });
};
