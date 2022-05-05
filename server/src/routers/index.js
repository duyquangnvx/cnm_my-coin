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
        let broadcastAddressData = function (nodes) {
            nodes.forEach(socketNode => {
                const address = socketNode.currentNodeUrl;
                const socket = io.sockets.sockets.get(socketNode.socketId);
                if (socket) {
                    emitAddressData(socket, address);
                }
            })
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
                    const node = new Blockchain(socket.id);
                    BlockChainData.nodes.push(node);
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
                        const address = data[0];
                        emitAddressData(socket, address);
                    }
                    break;
                case 'MINE_BLOCK':
                    if (data.length >= 1) {
                        const address = data[0];
                        BlockChainData.backup.mineTransactionInTransactionPool(address);
                        const reward = BlockChainData.backup.miningReward;
                        socket.emit('MINE_BLOCK', {
                            reward: reward
                        });
                        emitAddressData(socket, address);
                        broadcastPendingTransaction(BlockChainData.backup.pendingTransactions);

                        const lastBlock = BlockChainData.backup.getLatestBlock();
                        const transactions = lastBlock.transactions;
                        for (const trans in transactions) {

                        }
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
                        console.log('[CREATE_TRANSACTION] ', BlockChainData.backup.getBalanceOfAddress(sender));
                        broadcastPendingTransaction(BlockChainData.backup.pendingTransactions);
                        // if (ret) {
                        //     let pt = null;
                        //     BlockChainData.nodes.forEach(socketNode => {
                        //         socketNode.addTransactionToPendingTransactions(newTransaction);
                        //         pt = socketNode.pendingTransactions;
                        //     });
                        //
                        // }
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