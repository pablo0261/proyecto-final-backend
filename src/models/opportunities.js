const { DataTypes, INTEGER } = require('sequelize');
const { STATE_ACCEPTED, STATE_CANCELLED, STATE_COMPLETED, STATE_PENDING, STATE_RATINGCUSTOMERPENDING, STATE_RATINGPENDING, STATE_RATINGPROVIDERPENDING, STATE_VIEW } = require('../constants');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('opportunities', {
    idOpportunitie: {
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
    dateView: {
      type: DataTypes.DATE,
    },
    idService: {
      type: DataTypes.INTEGER,
    },
    dateHiring: {
      type: DataTypes.DATE,
    },
    dateOfService: {
      type: DataTypes.DATEONLY,
    },
    timeOfService:{
      type:DataTypes.TIME
    },
    durationOfService:{
      type:DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DECIMAL(12, 2)
    },
    dateAccepted: {
      type: DataTypes.DATE,
    },
    dateCancelled: {
      type: DataTypes.DATE,
    },
    idPeopleWhoCancel: {
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
    dateRatingCustomer:{
      type:DataTypes.DATE,
    },
    ratingProvider: {
      type: DataTypes.DECIMAL(2),
    },
    dateRatingProvider:{
      type:DataTypes.DATE,
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
          fields: ['idPeopleWhoCancel']
        },
        {
          unique: false,
          fields: ['state']
        },
      ]
    });
};
