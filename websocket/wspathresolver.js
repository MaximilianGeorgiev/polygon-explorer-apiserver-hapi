//const blocksController = require('../handlers/ws/blockHandlers.js');
//const transactionsController = require('../handlers/ws/transactionHandlers.js');
const addressesController = require('../handlers/ws/address.js');

exports.resolvePath = (connection, parsedMessage) => {
    if (parsedMessage[0] === "blocks"){
        if (parsedMessage[1] === "latest"){
            blocksController.returnLatestBlock(connection);
        } else if (parsedMessage[1] !== "from"){
            blocksController.returnBlockByNumberOrHash(connection, parsedMessage[1]);
        } else if (parsedMessage[1] === "pending"){
            blocksController.returnPendingBlocks(connection);
        } else {
            // try split parsedMessage[1] to see if it is a valid from=arg1&count=arg2 path
            const pathSegments = parsedMessage[1].split("&");

            // valid path
            if (pathSegments.length == 2){
              // pathSegments[0] = from=arg1 ; extract argument
              const arg1 = pathSegments[0].split("=");
              const arg2 = pathSegments[1].split("=");

              if (arg1.length == 2 && arg2.length == 2){
                  blocksController.returnMultipleBlocksAfterThreshold(connection, arg1[1], arg2[1]);
              }
            } else {
                  this.returnInvalidInput(connection);
            }
        }
    } else if (parsedMessage[0] === "transactions"){
          if (parsedMessage[1] === "latest"){
              transactionsController.returnLatestTransaction(connection);
          } else if (parsedMessage[1] === "hash"){
              if (parsedMessage.length === 3){
                  transactionsController.returnTransactionByHash(connection, parsedMessage[2]);
              } else {
                  this.returnInvalidInput(connection);
              }
          } else if (parsedMessage[1] === "pending"){
                  transactionsController.returnPendingTransactions(connection);
          } else if (parsedMessage[1] === "address"){
              if (parsedMessage.length === 3){
                  transactionsController.returnTransactionsCountByAddress(connection, parsedMessage[2]);
              } else {
                  this.returnInvalidInput(connection);
              }
          } else {
              this.returnInvalidInput(connection);
          }
    } else if (parsedMessage[0] === "addresses"){
          addressesController.returnAccountBalance(connection, parsedMessage[1]);
    }
};

const returnInvalidInput = (connection) => {
    connection.sendUTF("Invalid path.");
};