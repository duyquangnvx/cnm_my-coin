const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const routes = require('./routers/index')(io);


app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.io = io;
    next();
});

module.exports = {app: app, server: server};