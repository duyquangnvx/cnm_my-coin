const cc = require("../../../base/CCClass");
const crypto = require("crypto");

const Block = cc.Class.extend({
    /**
     * @param {number} timestamp
     * @param {Transaction[]} data
     * @param {string} previousHash
     */
    ctor: function (timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    },
    calculateHash: function () {
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
    },
    /***
     * using proof of work
     * @param {Number} difficulty
     */
    mineBlock: function (difficulty) {
        console.log(`Mining block ...`);
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    },

    hasValidTransaction: function () {
        let transactions = this.transactions;
        for (const trans of transactions) {
            if (!trans.isValid()) {
                return false;
            }
        }

        return true;
    },

    equals: function (block) {
        if (this.transactions.length !== block.transactions.length) {
            return false;
        }

        for (let i = 0; i < this.transactions.length; i++) {
            if (!this.transactions[i].equals(block.transactions[i])) {
                return false;
            }
        }

        return this.hash === block.hash && this.previousHash === block.previousHash && this.timestamp === block.timestamp && this.nonce === block.nonce;
    },
});

module.exports = Block;