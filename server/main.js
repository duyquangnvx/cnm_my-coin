const {Block, Blockchain, Transaction } = require('./src/modules/blockchain/logic');
const {createNewWallet} = require("./src/modules/blockchain/logic/KeyGenerator");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let omenWallet = createNewWallet();
let tomQWallet = createNewWallet();

let omenWalletKey = omenWallet.getPrivateKey();
console.log("Omen wallet private key", omenWalletKey);

let tomQWalletKey = tomQWallet.getPrivateKey();
console.log("TomQ wallet private key", tomQWalletKey);

let omenAddress = omenWallet.getAddress();
console.log("Omen wallet address", omenAddress);

let tomQAddress = tomQWallet.getAddress();
console.log("Omen wallet address", omenAddress);

// Create new instance of Blockchain class
const myCoin = new Blockchain();

console.log();
console.log(`Balance of Omen is ${myCoin.getBalanceOfAddress(omenAddress)}`);
console.log(`Balance of TomQ is ${myCoin.getBalanceOfAddress(tomQAddress)}`);

// Mine block
console.log("Omen is mining...");
myCoin.mineTransactionInTransactionPool(omenAddress);
console.log();
console.log(`Balance of Omen is ${myCoin.getBalanceOfAddress(omenAddress)}`);
console.log(`Balance of TomQ is ${myCoin.getBalanceOfAddress(tomQAddress)}`);

// Create a transaction & sign it with your key
const tx1 = new Transaction(omenAddress, tomQAddress, 99);
tx1.signTransactionWithPrivateKey(omenWalletKey);
// tx1.signTransaction(myWalletKey);
myCoin.addTransaction(tx1);

// Mine block
console.log("TomQ is mining...");
myCoin.mineTransactionInTransactionPool(tomQAddress);

console.log();
console.log(`Balance of Omen is ${myCoin.getBalanceOfAddress(omenAddress)}`);
console.log(`Balance of TomQ is ${myCoin.getBalanceOfAddress(tomQAddress)}`);

// Uncomment this line if you want to test tampering with the chain
// myWalletKey.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', myCoin.isChainValid() ? 'Yes' : 'No');