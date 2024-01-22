const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('oportunidades', {
    idOportunidad: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    idCliente: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    idProveedor: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fechaConsulta: {
      type: DataTypes.DATE,
    },
    idServicio: {
      type: DataTypes.INTEGER,
    },
    fechaContratacion: {
      type: DataTypes.DATE,
    },
    fechaEstimadaFinalizacion: {
      type: DataTypes.DATE,
    },
    precio: {
      type: DataTypes.DECIMAL(12, 2)
    },
    fechaAceptado: {
      type: DataTypes.DATE,
    },
    fechaCancelado: {
      type: DataTypes.DATE,
    },
    idPersonaCancelado: {
      type: DataTypes.UUID,
    },
    CausaCancelacion: {
      type: DataTypes.STRING,
    },
    fechaFinServicio: {
      type: DataTypes.DATE,
    },
    valoracionCliente: {
      type: DataTypes.DECIMAL(2),
    },
    valoracionProveedor: {
      type: DataTypes.DECIMAL(2),
    },
    observacionesCliente: {
      type: DataTypes.TEXT,
    },
    observacionesProveedor: {
      type: DataTypes.TEXT,
    },
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['idCliente']
        },
        {
          unique: false,
          fields: ['idProveedor']
        },
        {
          unique: false,
          fields: ['idServicio']
        },
        {
          unique: false,
          fields: ['idPersonaCancelado']
        },
      ]
    });
};
