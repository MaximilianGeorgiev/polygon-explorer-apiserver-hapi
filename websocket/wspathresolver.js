//const blocksController = require('../handlers/ws/blockHandlers.js');
//const transactionsController = require('../handlers/ws/transactionHandlers.js');
const addressesController = require('../handlers/ws/address.js');
const blocksController = require('../handlers/ws/blocks.js');
const transactionsController = require('../handlers/ws/transactions.js');

exports.resolvePath = (connection, parsedMessage) => {
    if (parsedMessage[1] === "blocks") {
        if (parsedMessage[2] === "latest") {
            blocksController.returnLatestBlock(connection);
        } else if (parsedMessage[2] === "ByNumber" && parsedMessage[3] === "OrHash") {
            blocksController.returnBlockByNumberOrHash(connection, parsedMessage[4]);
        } else if (parsedMessage[2] === "pending") {
            blocksController.returnPendingBlocks(connection);
        } else {
            if (parsedMessage.length === 4) {
                blocksController.returnMultipleBlocksAfterThreshold(connection,
                    parsedMessage[2], parsedMessage[3]);
            }
            else {
                this.returnInvalidInput(connection);
            }
        }
    } else if (parsedMessage[1] === "transactions") {
        if (parsedMessage[2] === "latest") {
            transactionsController.returnLatestTransaction(connection);
        } else if (parsedMessage[2] === "hash") {
            if (parsedMessage.length === 4) {
                transactionsController.returnTransactionByHash(connection, parsedMessage[3]);
            } else {
                this.returnInvalidInput(connection);
            }
        } else if (parsedMessage[2] === "pending") {
            transactionsController.returnPendingTransactions(connection);
        } else if (parsedMessage[2] === "address") {
            if (parsedMessage.length === 4) {
                transactionsController.returnTransactionsCountByAddress(connection, parsedMessage[3]);
            } else {
                this.returnInvalidInput(connection);
            }
        } else {
            this.returnInvalidInput(connection);
        }
    } else if (parsedMessage[0] === "addresses") {
        addressesController.returnAccountBalance(connection, parsedMessage[1]);
    }
};

const returnInvalidInput = (connection) => {
    connection.sendUTF("Invalid path.");
};