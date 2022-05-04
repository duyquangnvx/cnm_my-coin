const Blockchain = require("../logic/BlockChain");

const BlockChainData = (function () {

    return {
        init: function () {
            this.backup = new Blockchain();
            this.nodes = [];
        },
        reset: function () {
            this.init();
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