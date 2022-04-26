const cc = require("../../../base/CCClass");
const BlockChain = require("./BlockChain");
const BlockChainData = require("./data/BlockChainData");

const BlockChainModule = cc.Class.extend({
    ctor: function () {
        this.init();
    },
    init: function () {
        BlockChainData.init();
    },
    reset: function () {
        BlockChainData.reset();
    },
    onReceiveMessage: function (messageId, socket) {
        switch (messageId) {
            case "connection":
                let blockChain = new BlockChain(socket.id);
                let nodes = BlockChainData.getNodes();
                nodes.push(blockChain);
                socket.emit('PT', BlockChainData.getBackup().pendingTransactions);

                console.log("New user connected", socket.id);
                break;
            case "disconnect":
                console.log(`User: ${socket.id} was disconnected`)
                BlockChainData.removeNodeBySocketId(socket.id.toString());
                break;
        }
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