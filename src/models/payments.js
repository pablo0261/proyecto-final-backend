const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('payments', {
    idPayment: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    idPeople: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    emisionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentDay: {
      type: DataTypes.DATEONLY,
    },
    methodOfPayment: {
      type: DataTypes.STRING
    },
    price:{
      type:DataTypes.DECIMAL(12,2)
    },
    responseApi:{
        type:DataTypes.STRING,
        allowNull:true
    }

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
