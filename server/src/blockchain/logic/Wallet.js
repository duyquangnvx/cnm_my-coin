const cc = require("../../base/CCClass");
const fs = require("fs");

const Wallet = cc.Class.extend({
    ctor: function (publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    },
    getPrivateKey: function () {
        return this.privateKey;
    },
    getPublicKey: function () {
        return this.publicKey;
    },
    getAddress: function () {
        return this.publicKey;
    }
});

module.exports = Wallet;