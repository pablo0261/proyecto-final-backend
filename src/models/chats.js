const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('chats', {
    idChat: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    idOpportunitie: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    idPeople: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dateMessage: {
      type: DataTypes.DATE,
    },
    dateReaded: {
      type: DataTypes.DATE,
    },
    message: {
      type: DataTypes.TEXT
    },
    isRating:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    isRated:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['idOpportunitie']
        },
        {
          unique: false,
          fields: ['idPeople']
        },
        {
            unique: false,
            fields: ['idOpportunitie','dateMessage']
          },
      ]
    });
};
