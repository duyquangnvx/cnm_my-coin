var express = require('express');

const {createNewWallet} = require("../blockchain/logic/KeyGenerator");
const BlockChainData = require("../blockchain/data/BlockChainData");

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
        socket.onAny((event, data) => {
            switch (event) {
                case 'CREATE_NEW_WALLET':
                    let wallet = createNewWallet();
                    console.log(JSON.stringify(wallet));
                    socket.emit('CREATE_NEW_WALLET', wallet);
                    break;
                case 'ACCESS_MY_WALLET':

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