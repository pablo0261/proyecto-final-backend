const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('personas_opciones', {
    id:{
      type: DataTypes.UUID,
      allowNull:false,
      primaryKey:true
    },
    idPersona:{
      type: DataTypes.UUID,
      allowNull:false,
    },
    idOpcion:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.DECIMAL(12,2),
    },
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['idPersona']
        },
        {
          unique: false,
          fields: ['idOpcion']
        },
        {
          unique: true,
          fields: ['idPersona','idOpcion']
        }
      ]
    });
};
