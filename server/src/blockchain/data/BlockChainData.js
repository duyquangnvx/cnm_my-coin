const Blockchain = require("../logic/BlockChain");
const {generateKeyPair} = require("../logic/KeyGenerator");

const BlockChainData = (function () {

    return {
        init: function () {
            this.backup = new Blockchain();
            this.nodes = [];
            this._initPoolReward();
        },
        _initPoolReward: function () {
            let lastBlock = this.backup.getLatestBlock();
            this.backup.createNewBlock(lastBlock.hash);

            lastBlock = this.backup.getLatestBlock();
            const systemKey = generateKeyPair();
            const master = this.backup.createNewTransaction(systemKey.publicKey, "system-reward",1000000);
            master.signTransactionWithPrivateKey(systemKey.privateKey);
            lastBlock.transactions.push(master);
            lastBlock.hash = lastBlock.calculateHash();
        },
        reset: function () {
            this.init();
        },
        getLastNode: function () {
            return this.nodes[this.nodes.length - 1];
        },
        getBackup: function () {
            return this.backup;
        },
        getNodes: function () {
            return this.nodes;
        },
        removeNodeBySocketId: function (socketId) {
            let index = this.nodes.findIndex(socket => socket.id === socketId);
            if (index >= 0) {
                this.nodes.splice(index, 1);
            }
        },
    }

})();

module.exports = BlockChainData;