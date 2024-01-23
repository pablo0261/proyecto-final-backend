const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('people_logins', {
    id:{
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey:true
    },
    idPeople:{
      type: DataTypes.UUID,
      allowNull:false,
    },
    loginDate:{
      type: DataTypes.DATE,
    },
    logoutDate: {
      type: DataTypes.DATE,
    },
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['idPeople']
        },
      ]
    });
};
