const cc = require("../../../base/CCClass");
const BlockChain = require("./BlockChain");

const BlockChainModule = cc.Class.extend({
    ctor: function () {

    },
    init: function () {

    },
    reset: function () {

    },
    createWallet: function () {

    },
    createTransaction: function () {

    },
    getHistory: function () {

    },
    getWalletBalance: function () {

    },
});

BlockChainModule.getInstance = function () {
    if (BlockChainModule._instance === null) {
        BlockChainModule._instance = new BlockChainModule();
    }
    return BlockChainModule._instance;
};

module.exports = BlockChainModule;