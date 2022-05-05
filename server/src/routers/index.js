var express = require('express');

const {generateKeyPair} = require("../blockchain/logic/KeyGenerator");
const BlockChainData = require("../blockchain/data/BlockChainData");
const {Blockchain} = require("../blockchain/logic");

var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
});

module.exports = function (io) {
    //Socket.IO
    BlockChainData.init();

    io.on('connection', (socket) => {
        console.log("New user connected", socket.id);
        //
        socket.emit('CONNECT_SUCCESS');

        let broadcastPendingTransaction = function (pendingTransactions) {
            io.emit('PENDING_TRANSACTIONS', {
                pendingTransactions: pendingTransactions
            });
        };
        let emitAddressData = function (socket, address) {
            const addressData = BlockChainData.backup.getAddressData(address);
            if (addressData !== undefined) {
                socket.emit('GET_WALLET_DATA', {
                    balance: addressData.addressBalance,
                    addressTransactions: addressData.addressTransactions,
                    amountArr: addressData.amountArr
                });
            }
            console.log('emitAddressData', addressData.addressBalance);
        };

        socket.onAny((event, data) => {
            switch (event) {
                case 'CREATE_NEW_WALLET':
                    BlockChainData.nodes.push(new Blockchain(socket.id));
                    let keyPair = generateKeyPair();
                    let address = keyPair.publicKey;
                    socket.emit('CREATE_NEW_WALLET', {
                        privateKey: keyPair.privateKey,
                        publicKey: keyPair.publicKey,
                    });
                    emitAddressData(socket, address);
                    broadcastPendingTransaction(BlockChainData.backup.pendingTransactions);
                    break;
                case 'GET_WALLET_DATA':
                    if (data.length >= 1) {
                        let address = data[0];
                        emitAddressData(socket, address);
                    }
                    break;
                case 'CREATE_TRANSACTION':
                    if (data.length >= 4) {
                        const privateKey = data[0]
                        const sender = data[1];
                        const recipient = data[2];
                        const amount = data[3];
                        const newTransaction = BlockChainData.getLastNode().createNewTransaction(sender, recipient, amount);
                        newTransaction.signTransactionWithPrivateKey(privateKey);
                        const ret = BlockChainData.backup.addTransactionToPendingTransactions(newTransaction);
                        if (ret) {
                            let pt = null;
                            BlockChainData.nodes.forEach(socketNode => {
                                socketNode.addTransactionToPendingTransactions(newTransaction);
                                pt = socketNode.pendingTransactions;
                            });
                            broadcastPendingTransaction(pt);
                        }
                    }
                    break;
            }
        });
        //End ON Events
    });

    io.on('disconnect', (socket) => {
        console.log(`User: ${socket.id} was disconnected`);
        BlockChainData.removeNodeBySocketId(socket.id.toString());
    });

    return router;
};