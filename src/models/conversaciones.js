const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('conversaciones', {
    idConversacion: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    idOportunidad: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    idPersona: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fechaMensaje: {
      type: DataTypes.DATE,
    },
    fechaLeido: {
      type: DataTypes.DATE,
    },
    mensaje: {
      type: DataTypes.TEXT
    }
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['idOportunidad']
        },
        {
          unique: false,
          fields: ['idPersona']
        },
      ]
    });
};
