    //                       _oo0oo_
    //                      o8888888o
    //                      88" . "88
    //                      (| -_- |)
    //                      0\  =  /0
    //                    ___/`---'\___
    //                  .' \\|     |// '.
    //                 / \\|||  :  |||// \
    //                / _||||| -:- |||||- \
    //               |   | \\\  -  /// |   |
    //               | \_|  ''\---/''  |_/ |
    //               \  .-\__  '-'  ___/-. /
    //             ___'. .'  /--.--\  `. .'___
    //          ."" '<  `.___\_<|>_/___.' >' "".
    //         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
    //         \  \ `_.   \_ __\ /__ _/   .-` /  /
    //     =====`-.____`.___ \_____/___.-`___.-'=====
    //                       `=---='
    //     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // require('dotenv').config();
    // const { PORT, SYNC_FORCE } = process.env;

    // const server = require('./src/app.js');
    // const { conn } = require('./src/db.js');
    // // Syncing all the models at once.
    // conn.sync({ alter: SYNC_FORCE }).then(() => {
    //   server.listen(PORT, () => {
    //     console.log('Server listening at 3001'); // eslint-disable-line no-console
    //   });
    // });
    require('dotenv').config();
    const cron = require('node-cron');
    const { PORT, SYNC_FORCE } = process.env;
    const {server,serverSocket,io} = require('./src/app.js');
    const { conn, People } = require('./src/db.js');
    const updateAges = require('./src/utils/updateAges.js');

    // Función para actualizar la edad
    async function startServer() {
        try {
            await conn.authenticate();
            console.log('Conexión establecida correctamente con la base de datos.');

            // Sincronizar el modelo con la base de datos (si es necesario)
            await conn.sync({ force: SYNC_FORCE });

            console.log('Realizando tareas de mantenimiento.');
            // Ejecutar la tarea de actualización al iniciar el servidor
            updateAges()

            // Ejecutar la tarea de actualización cada día a las 00:00
            cron.schedule('0 0 * * *', async () => {
                console.log('Realizando tareas programadas.');
                //contorl de age
                updateAges()    

                console.log(`Server listening at ${PORT}`);
            });

            // Resto de la configuración y rutas de tu servidor
            serverSocket.listen(PORT, () => {
                console.log(`Server listening at ${PORT}`);
            });
        } catch (error) {
            console.error('Error al iniciar el servidor:', error);
        }
    }

    startServer();