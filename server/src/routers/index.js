var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
});

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('User has connected to Index');
        //ON Events
        socket.on('admin', function () {
            console.log('Successful Socket Test');
        });

        //End ON Events
    });
    return router;
};