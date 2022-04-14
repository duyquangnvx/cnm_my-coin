const {Blockchain, Transaction } = require('./modules/blockchain/logic');

const express = require('express');
const bodyParser = require('body-parser');
const { createNewWallet } = require("./modules/blockchain/logic/KeyGenerator");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT || 3000;

let server = app.listen(port, "127.0.0.1", function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});

// Create new instance of Blockchain class
let blockchain = new Blockchain();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get("/wallet-create", (req, res) => {
    let wallet = createNewWallet();
    console.log(JSON.stringify(wallet));
    res.send(wallet);
});

app.get('/blockchain', (req, res) => {
    res.send(blockchain);
});

app.post('/newTransaction', (req, res) => {
    const { FromAddress, ToAddress, Amount} = req.body;
    console.log(JSON.stringify(req.body));

    if (!Amount || Amount < 0 || !FromAddress || !ToAddress) {
        res.json({
            note: 'invalid input data'
        });
    }

    let transaction = new Transaction(FromAddress, ToAddress, Amount);

    blockchain.addTransaction(transaction);

    res.send({
        messgae:"OK"
    });
});
