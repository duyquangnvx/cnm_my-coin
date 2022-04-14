const crypto = require('crypto');
const cc = require("../../../base/CCClass");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


let Transaction = cc.Class.extend({
    fromAddress: null,
    toAddress: null,
    amount: null,
    timestamp: null,

    /**
     * @param {string} fromAddress
     * @param {string} toAddress
     * @param {number} amount
     */
    ctor: function (fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
    },

    calculateHash: function () {
        return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount + this.timestamp).digest('hex');
    },

    signTransactionWithPrivateKey: function (privateKey) {
        let signingKey = ec.keyFromPrivate(privateKey, 'hex');
        this.signTransaction(signingKey);
    },

    signTransaction: function (signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            console.log("[Transaction] signTransaction", 'You cannot sign transactions for other wallets!');
            return;
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    },

    isValid: function () {
        if (this.fromAddress === null) {
            return true;
        }

        if (!this.signature || this.signature.length === 0) {
            console.log("[Transaction] isValid", "No signature in this transaction");
            return false;
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    },

    equals: function (transaction) {
        return this.fromAddress === transaction.fromAddress && this.toAddress === transaction.toAddress && this.amount === transaction.amount && this.timestamp === transaction.timestamp && this.signature === transaction.signature;
    },
})

module.exports = Transaction;