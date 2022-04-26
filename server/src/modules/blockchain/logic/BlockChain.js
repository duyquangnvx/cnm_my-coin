const cc = require("../../../base/CCClass");
const Block = require("./Block");
const Transaction = require("./Transaction");
const currentNodeUrl = process.argv[3];
/**
 *
 * @param {Block[]} chain
 * @param {Transaction[]} transactionPool
 * @param {number} difficulty
 * @param {number} miningReward
 */
const BlockChain = cc.Class.extend({
    ctor: function (socketId) {
        this.socketId = socketId;
        this.currentNodeUrl = currentNodeUrl;
        this.networkNodes = [];
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];

        this.difficulty = 5;
        this.miningReward = 100;
    },

    createNewBlock: function (nonce, previousBlockHash) {
        let index = this.chain.length + 1;
        let timestamp = Date.now();
        let date = new Date().toString();
        let transactions = this.pendingTransactions;
        let newBlock = new Block(index, timestamp, date, transactions, nonce, previousBlockHash);

        this.pendingTransactions = [];  //reset the pendingTransactions for the next block.
        this.chain.push(newBlock);  //push to the blockchain the new block.
        return newBlock;
    },

    createGenesisBlock: function () {
        return new Block(0, Date.now(), new Date().toString(), [], 100, '0');
    },

    getLatestBlock: function () {
        return this.chain[this.chain.length - 1];
    },

    /**
     *
     * @param {Number} amount
     * @param {string} sender
     * @param {string} recipient
     * @returns {Transaction}
     */
    createNewTransaction: function (amount, sender, recipient) {
        return new Transaction(amount, sender, recipient);
    },

    /**
     *
     * @param {Transaction} transaction
     * @return {number} return next index of current chain
     */
    addTransactionToPendingTransactions: function (transaction) {
        this.pendingTransactions.push(transaction);
        let latestBlock = this.getLatestBlock();
        return latestBlock.index + 1;
    },

    proofOfWork: function (previousBlockHash, current) {

    },

    isChainValid: function () {
        // Check if the Genesis block hasn't been tampered with by comparing
        // the output of createGenesisBlock with the first block on our chain
        const realGenesis = this.createGenesisBlock();
        if (!realGenesis.equals(this.chain[0])) {
            console.log("[BlockChain] isChainValid", "invalid realGenesis");
            return false;
        }

        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log("[BlockChain] isChainValid", "invalid previousHash");
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log("[BlockChain] isChainValid", "invalid hash");
                return false;
            }

            if (!currentBlock.hasValidTransaction()) {
                console.log("[BlockChain] isChainValid", "invalid transaction");
                return false;
            }
        }

        return true;
    },

    getBlockByHash: function (blockHash) {
        return this.chain.find(block => block.hash = blockHash);
    },
    getTransactionAndBlockItBelongsToByTransactionId: function (transactionId) {
        for (let i = 0; i < this.chain.length; i++) {
            let block = this.chain[i];
            for (let j = 0; j < block.transactions.length; j++) {
                let transaction = block.transactions[j];
                if (transaction.transactionId === transactionId) {
                    return {
                        transaction: transaction,
                        block: block
                    };
                }
            }
        }
        return {transaction: null, block: null};
    },
    getPendingTransactions: function () {
        return this.pendingTransactions;
    },

    getAddressData: function (address) {
        const addressTransactions = [];
        this.chain.forEach(block => {
            block.transactions.forEach(transaction => {
                if (transaction.sender === address || transaction.recipient === address) {
                    addressTransactions.push(transaction); //push all tranasction by sender or recipient into array.
                }
            });
        });

        if (addressTransactions.length === 0) {
            return false;
        }

        var amountArr = [];

        let balance = 0;
        addressTransactions.forEach(transaction => {
            if (transaction.recipient === address) {
                balance += transaction.amount;
                amountArr.push(balance);
            }
            else if (transaction.sender === address) {
                balance -= transaction.amount;
                amountArr.push(balance);
            }

        });

        return {
            addressTransactions: addressTransactions,
            addressBalance: balance,
            amountArr: amountArr
        };
    },

    //
    mineTransactionInTransactionPool: function (miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        // reset transaction pool
        this.pendingTransactions = [];
    },

    addTransaction: function (transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            console.log('[BlockChain] addTransaction', 'Transaction must include from and to address');
            return;
        }

        if (transaction.amount <= 0) {
            console.log('[BlockChain] addTransaction', 'Transaction amount should be higher than 0');
            return;
        }

        // Verify the transactiion
        if (!transaction.isValid()) {
            console.log('[BlockChain] addTransaction', 'Cannot add invalid transaction to chain');
            return;
        }

        // Making sure that the amount sent is not greater than existing balance
        const walletBalance = this.getBalanceOfAddress(transaction.fromAddress);
        if (walletBalance < transaction.amount) {
            console.log('[BlockChain] addTransaction', 'Not enough balance');
            return;
        }

        // Get all other pending transactions for the "from" wallet
        const pendingTxForWallet = this.pendingTransactions
            .filter(tx => tx.fromAddress === transaction.fromAddress);

        // If the wallet has more pending transactions, calculate the total amount
        // of spend coins so far. If this exceeds the balance, we refuse to add this
        // transaction.
        if (pendingTxForWallet.length > 0) {
            const totalPendingAmount = pendingTxForWallet
                .map(tx => tx.amount)
                .reduce((prev, curr) => prev + curr);

            const totalAmount = totalPendingAmount + transaction.amount;
            if (totalAmount > walletBalance) {
                console.log('[BlockChain] addTransaction', 'Pending transactions for this wallet is higher than its balance.');
                return;
            }
        }


        this.pendingTransactions.push(transaction);
        console.log('[BlockChain] addTransaction', 'transaction added: ' + JSON.stringify(transaction));
    },

    getBalanceOfAddress: function (address) {
        let balance = 0;

        for (const block of this.chain) {
            let transactions = block.transactions;
            for (const trans of transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    },

    getAllTransactionsForWallet: function (address) {
        const txs = [];

        for (const block of this.chain) {
            let transactions = block.transactions;
            for (const tx of transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }

        console.log('get transactions for wallet count: ' + txs.length);
        return txs;
    },


});

module.exports = BlockChain;