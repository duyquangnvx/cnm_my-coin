const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const fs = require('fs');

function generateKeyPair () {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
    
    fs.appendFileSync('masterKeysForDelete.txt', '\nprivateKey: ' + privateKey);
    fs.appendFileSync('masterKeysForDelete.txt', '\npublicKey: ' + publicKey);

    return {
        privateKey: privateKey,
        publicKey: publicKey
    };
}

module.exports = { generateKeyPair };