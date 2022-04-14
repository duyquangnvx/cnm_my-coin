import BlockChain from "../logic/BlockChain";

const BlockChainData = (function () {

    return {
        init: function () {
            this.difficulty = 2;
            this.blockChain = new BlockChain();
            this.blockChain.difficulty = this.difficulty;
        },
        reset: function () {
            this.init();
        },
    }

})();