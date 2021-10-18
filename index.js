'use strict';

const Hapi = require('@hapi/hapi');
const blockRoutes = require('./routes/blocks.js');
const blockHandlers = require('./handlers/blockhandlers.js');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: blockRoutes.latestBlockPath(),
        handler: blockHandlers.latestBlockHandler
    });

    server.route({
        method: 'GET',
        path: blockRoutes.pendingBlocksPath(),
        handler: blockHandlers.pendingBlocksHandler
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();