const { DataTypes, INTEGER } = require('sequelize');
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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    idLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    geoposition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idGenre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM,
      values: ['Active', 'Inactive', 'Deleted'],
      allowNull: false,
    },
    noShow:{
      type:DataTypes.BOOLEAN
    },
    aboutMe: {
      type: DataTypes.TEXT,
    },
    dateOfAdmission: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    typeOfPerson: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['administrator','customer',`'provider']
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
    weekCalendar:{
      type: DataTypes.ARRAY(DataTypes.BOOLEAN)
    }
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['name']
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
