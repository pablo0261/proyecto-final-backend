const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DIALECT_OPTIONS, SSL, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    force: true,
    logging: false,
    native: false,
    dialect: 'postgres',
    ssl: SSL,
    define: {
      freezeTableName: true,
      timestamps: false,
    },
    dialectOptions: JSON.parse(DIALECT_OPTIONS),
    query: {
      raw: true, // Establece raw: true globalmente
    },
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Categorias_opciones, Categorias, Personas_logins, Personas_opciones, Personas, Oportunidades, Conversaciones, Pagos } = sequelize.models;

// Relaciones

Personas.belongsToMany(Categorias_opciones,
  {
    through: Personas_opciones,
    foreignKey: 'idPersona'
  });

Categorias_opciones.belongsToMany(Personas,
  {
    through: Personas_opciones,
    foreignKey: 'idOpcion'
  });

Personas.hasOne(Categorias_opciones, {
  foreignKey: 'idGenero'
})

Categorias_opciones.belongsTo(Personas)

Categorias.hasMany(Categorias_opciones, {
  foreignKey: 'idCategoria'
})

Personas.hasMany(Personas_logins, {
  foreignKey: 'idPersona'
})

Personas.hasMany(Pagos, {
  foreignKey: 'idPersona'
})

Personas.hasMany(Oportunidades, {
  foreignKey: 'idCliente'
})

Personas.hasMany(Oportunidades, {
  foreignKey: 'idProveedor'
})

Oportunidades.hasMany(Conversaciones, {
  foreignKey: 'idOportunidad'
})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
