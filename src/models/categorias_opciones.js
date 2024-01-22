const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categorias_opciones', {
    idOpcion:{
      type: DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    idCategoria:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['descripcion']
        },
        {
          unique: true,
          fields: ['descripcion','idCategoria']
        },
        {
          unique: false,
          fields: ['idCategoria']
        },
      ]
    });
};
