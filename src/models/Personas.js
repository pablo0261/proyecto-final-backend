const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('personas', {
    idPersona: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    apellidoNombre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    direccion: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    idLocalidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idGenero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['activo', 'inactivo', 'borrado'],
      allowNull: false,
    },
    aboutMe: {
      type: DataTypes.TEXT,
    },
    fechaAlta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tipoPersona: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ['administrador', 'proveedor', 'cliente']
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idLoginExterna: {
      type: DataTypes.STRING,
    }
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['apellidoNombre']
        },
        {
          unique: false,
          fields: ['idLoginExterna']
        },
        {
          unique: false,
          fields: ['idLocalidad']
        },
        {
          unique: false,
          fields: ['idGenero']
        },
        {
          unique: true,
          fields: ['email']
        },
      ]
    });
};
