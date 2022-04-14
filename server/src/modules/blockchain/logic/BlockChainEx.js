const cc = require("../../../base/CCClass");
const BlockChain = require("./BlockChain");

const BlockChainEx = cc.Class.extend({
    ctor: function () {
        this.blockChain = new BlockChain();
    },
    setDifficulty: function (difficulty) {
        this.blockChain.difficulty = difficulty;
    },
});

BlockChainEx.getInstance = function () {
    if (BlockChainEx._instance === null) {
        BlockChainEx._instance = new BlockChainEx();
    }
    return BlockChainEx._instance;
};

module.exports = BlockChainEx;