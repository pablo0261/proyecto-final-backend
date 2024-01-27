const { DataTypes, INTEGER } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('people', {
    idPeople: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    idLocation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    geoposition: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    idGenre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    state: {
      type: DataTypes.ENUM,
      values: ['Active', 'Inactive', 'Deleted'],
      allowNull: false,
      defaultValue: 'Active'
    },
    aboutMe: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    dateOfAdmission: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    typeOfPerson: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['administrator', 'customer', 'provider']
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    externalLogin: {
      type: DataTypes.STRING,
    },
    weekCalendar: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        const birthDate = this.getDataValue('birthDate');
        if (!birthDate) return 0;

        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();

        if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
          age--;
        }

        return age;
      }
    },
  },
    {
      indexes: [
        {
          unique: false,
          fields: ['fullName']
        },
        {
          unique: false,
          fields: ['externalLogin']
        },
        {
          unique: false,
          fields: ['idLocation']
        },
        {
          unique: false,
          fields: ['idGenre']
        },
        {
          unique: true,
          fields: ['email']
        },
      ]
    });
};
