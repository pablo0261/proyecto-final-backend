const swaggerJSDoc  = require("swagger-jsdoc");
const path = require('path');

const options = swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Backend PF Documentación",
            version: "1.0.0",
        },
    },
    apis: [`${path.join(__dirname, './routes/*')}`],
    noCache: true
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };