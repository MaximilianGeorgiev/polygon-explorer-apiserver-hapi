'use strict';

const Hapi = require('@hapi/hapi');

const blockRoutes = require('./routes/blocks.js');
const blockHandlers = require('./handlers/blockhandlers.js');

const transactionRoutes = require('./routes/transactions.js');
const transactionHandlers = require('./handlers/transactionhandlers.js');

const addressRoutes = require('./routes/addresses.js');
const addressHandlers = require('./handlers/addressHandlers.js');

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

    server.route({
        method: 'GET',
        path: blockRoutes.blockByHashOrNumberPath(),
        handler: blockHandlers.numberOrHashBlocksHandler
    });

    server.route({
        method: 'GET',
        path: blockRoutes.multipleBlocksAfterThresholdPath(),
        handler: blockHandlers.multipleBlocksAfterThresholdHandler
    });
    
    server.route({
        method: 'GET',
        path: transactionRoutes.latestTransactionPath(),
        handler: transactionHandlers.latestTransactionHandler
    });

    server.route({
        method: 'GET',
        path: transactionRoutes.pendingTransactionsPath(),
        handler: transactionHandlers.pendingTransactionsHandler
    });

    server.route({
        method: 'GET',
        path: transactionRoutes.transactionsCountByAddressPath(),
        handler: transactionHandlers.addressTxCountHandler
    });

    server.route({
        method: 'GET',
        path: transactionRoutes.transactionsByHashPath(),
        handler: transactionHandlers.transactionsByHashHandler
    });

    server.route({
        method: 'GET',
        path: addressRoutes.accountBalancePath(),
        handler: addressHandlers.accountBalanceHandler
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();