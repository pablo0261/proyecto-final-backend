const express = require('express');
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger.js");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const path = require('path');
const { ACCESS_CONTROL_ALLOW_ORIGIN } = process.env;

const http = require('http');
const socketIO = require('socket.io'); // Importa socket.io


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',ACCESS_CONTROL_ALLOW_ORIGIN); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// const pathImages=path.join(__dirname, '../../images/')
// server.use('/images', express.static(pathImages));

server.use('/', routes);

// Implementación de Swagger
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

const serverSocket = http.createServer(server); // Crea un servidor HTTP
const io = socketIO(serverSocket,{
    cors: {
        origin: 'http://localhost:5173', // Reemplazar con el origen de tu aplicación React
        methods: ['GET', 'POST'],
        credentials: true
    }
}); // Crea una instancia de socket.io y la asocia con el servidor HTTP

// ...

io.on('connection', (socket) => {
    console.log(socket)
    console.log(`Usuario conectado: ${socket.id}`);

    // Maneja eventos de Socket.IO según tus necesidades
    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
        // Broadcast a todos los clientes conectados
        io.emit('mensaje', data);
    });

    // Maneja la desconexión del socket
    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
    });
});


module.exports = { server, serverSocket, io };
