const {Block, Blockchain, Transaction } = require('./src/blockchain/logic');
const {generateKeyPair} = require("./src/blockchain/logic/KeyGenerator");
const BlockChainData = require("./src/blockchain/data/BlockChainData");


const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

BlockChainData.init();

// Create new instance of Blockchain class
const myCoin = BlockChainData.backup;
console.log("system-reward pool", myCoin.getBalanceOfAddress('system-reward'));

let omenWallet = generateKeyPair();
let tomQWallet = generateKeyPair();

let omenWalletKey = omenWallet.privateKey;
console.log("Omen wallet private key", omenWalletKey);

let tomQWalletKey = tomQWallet.privateKey;
console.log("TomQ wallet private key", tomQWalletKey);

let omenAddress = omenWallet.publicKey;
console.log("Omen wallet address", omenAddress);

let tomQAddress = tomQWallet.publicKey;
console.log("Omen wallet address", omenAddress);


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
const tx1 = myCoin.createNewTransaction(omenAddress, tomQAddress, 99);
tx1.signTransactionWithPrivateKey(omenWalletKey);
// tx1.signTransaction(myWalletKey);
myCoin.addTransactionToPendingTransactions(tx1);
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