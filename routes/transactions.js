exports.transactionsByHashPath = () => {
    return '/transactions/hash/{hash}';
};

exports.pendingTransactionsPath = () => {
    return '/transactions/pending';
};

exports.transactionsCountByAddressPath = () => {
    return '/transactions/address/{address}';
};

exports.latestTransactionPath = () => {
    return '/transactions/latest';
};