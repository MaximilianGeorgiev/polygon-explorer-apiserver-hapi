const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.latestBlockHandler = async (request, h) => {
    let response;

    await web3.eth.getBlock('latest', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
};

exports.pendingBlocksHandler = async (request, h) => {
    let response;

    await web3.eth.getBlock('pending', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        response = JSON.parse(JSON.stringify(value));
    });

    return response;
};