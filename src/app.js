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
    res.header('Access-Control-Allow-Origin', ACCESS_CONTROL_ALLOW_ORIGIN); // update to match the domain you will make the request from
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
const io = socketIO(serverSocket, {
    cors: {
        origin: ACCESS_CONTROL_ALLOW_ORIGIN, // Reemplazar con el origen de tu aplicación React
        //     methods: ['GET', 'POST'],
        //     credentials: true
    }
}); // Crea una instancia de socket.io y la asocia con el servidor HTTP

// ...
let connectedUsers = []

io.on('connection', (socket) => {

    socket.on('join-request', (idPeople) => {
        if (!idPeople) return

        const foundUSerSocket = connectedUsers.find((user) => {
            return user.idPeople === idPeople && user.idSocket === socket.id
        })
        connectedUsers.filter((user) => {
            user.idPeople != null
        })

        if (!foundUSerSocket) connectedUsers.push({ idPeople: idPeople, idSocket: socket.id })

        console.log('Usuarios Conectados:', connectedUsers)
    })
    socket.on('logout-request', (idPeople) => {
        connectedUsers = connectedUsers.filter(people => people.idPeople !== idPeople)
        console.log('Usuarios Conectados:', connectedUsers)
    })

    socket.on('join-chat', ({ idPeople, idOpportunitie }) => {
        if (!idPeople) return
        socket.idPeople = idPeople
        socket.idOpportunitie = idOpportunitie
        connectedUsers.forEach(usuario => {
            // Verificamos si el idPeople coincide con el pasado como parámetro
            if (usuario.idPeople === idPeople) {
                // Si coincide, agregamos la propiedad idChat al objeto
                usuario.idOpportunitie = idOpportunitie;
            }
        });
        // connectedUsers = connectedUsers.filter(people => people.idPeople !== idPeople)
        console.log('Usuarios Conectados:a', connectedUsers)
    })

    socket.on('send-chat', (params) => {
        const { idOpportunitie, idCustomer, idProvider, idChat } = params
        io.emit('render-chat', {
            idOpportunitie: idOpportunitie,
            idPeople: idProvider,
            idChat: idChat
        });
        io.emit('render-chat', {
            idOpportunitie: idOpportunitie,
            idPeople: idCustomer,
            idChat: idChat
        });
    })
    socket.on('disconnect', () => {
        connectedUsers.filter((user) => {
            user.idSocket != socket
        })
        console.log('Usuarios Conectados:', connectedUsers)
    })
});


module.exports = { server, serverSocket, io };
