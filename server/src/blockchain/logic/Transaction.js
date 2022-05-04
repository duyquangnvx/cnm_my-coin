const crypto = require('crypto');
const cc = require("../../base/CCClass");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuid = require('uuidv1');
const Utility = require("../../Utility"); //generate unique transaction id.


let Transaction = cc.Class.extend({
    /**
     * @param {number} amount
     * @param {string} sender
     * @param {string} recipient
     */
    ctor: function (amount, sender, recipient) {
        this.transactionId = uuid().split('-').join('');
        this.amount = amount;
        this.timestamp = Date.now();
        this.date = Utility.getDateString();
        this.sender = sender;
        this.recipient = recipient;
    },

    calculateHash: function () {
        return crypto.createHash('sha256').update(this.sender + this.recipient + this.amount + this.timestamp).digest('hex');
    },

    signTransactionWithPrivateKey: function (privateKey) {
        let signingKey = ec.keyFromPrivate(privateKey, 'hex');
        this.signTransaction(signingKey);
    },

    signTransaction: function (signingKey) {
        if (signingKey.getPublic('hex') !== this.sender) {
            console.log("[Transaction] signTransaction", 'You cannot sign transactions for other wallets!');
            return;
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    },

    isValid: function () {
        if (this.sender === null) {
            return true;
        }

        if (!this.signature || this.signature.length === 0) {
            console.log("[Transaction] isValid", "No signature in this transaction");
            return false;
        }

        const publicKey = ec.keyFromPublic(this.sender, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    },

    equals: function (transaction) {
        return this.sender === transaction.sender && this.recipient === transaction.recipient && this.amount === transaction.amount && this.timestamp === transaction.timestamp && this.signature === transaction.signature;
    },
})

module.exports = Transaction;