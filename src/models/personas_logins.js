const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('personas_logins', {
    id:{
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey:true
    },
    idPersona:{
      type: DataTypes.UUID,
      allowNull:false,
    },
    fechaLogin:{
      type: DataTypes.DATE,
    },
    fechaLogout: {
      type: DataTypes.DATE,
    },
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['idPersona']
        },
      ]
    });
};
