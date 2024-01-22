const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pagos', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    idPersona: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fechaEmision: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaVencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaPago: {
      type: DataTypes.DATEONLY,
    },
    formaPago: {
      type: DataTypes.STRING
    }
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
