const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categorias', {
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    esGenero: {
      type: DataTypes.BOOLEAN,
    },
    esServicio: {
      type: DataTypes.BOOLEAN,
    },
  },
    {
      indexes: [
        {
          unique: true,
          fields: ['descripcion']
        }
      ]
    });
};
