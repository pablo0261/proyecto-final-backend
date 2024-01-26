const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categories', {
    idCategorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
    },
    isGenre: {
      type: DataTypes.BOOLEAN,
    },
    isEducation: {
      type: DataTypes.BOOLEAN,
      default:false
    },
    isSkill: {
      type: DataTypes.BOOLEAN,
      default:false
    },
    isService: {
      type: DataTypes.BOOLEAN,
      default:false
    },
    isInterest: {
      type: DataTypes.BOOLEAN,
      default:false
    },
    isExtra: {
      type: DataTypes.BOOLEAN,
      default:false
    },
    isExperience: {
      type: DataTypes.BOOLEAN,
      default:false
    },
    includeCustomer: {
      type: DataTypes.BOOLEAN,
      default:true
    },
    includeProvider: {
      type: DataTypes.BOOLEAN,
      default:true
    },
  },
    {
      indexes: [
        {
          unique: true,
          fields: ['description']
        }
      ]
    });
};
