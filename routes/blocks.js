exports.latestBlockPath = () => {
    return "/blocks/latest";
};

exports.pendingBlocksPath = () => {
    return "/blocks/pending";
};

exports.blockByHashOrNumberPath = () => {
    return "/blocks/ByNumber/OrHash/{arg}";
};

exports.multipleBlocksAfterThresholdPath = () => {
    return "/blocks/{from}/{count}";
};