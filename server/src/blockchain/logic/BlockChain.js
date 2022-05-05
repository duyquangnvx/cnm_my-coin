const cc = require("../../base/CCClass");
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

        this.difficulty = 2;
        this.miningReward = 100;
    },

    createNewBlock: function (previousBlockHash) {
        let index = this.chain.length + 1;
        let timestamp = Date.now();
        let transactions = this.pendingTransactions;
        let newBlock = new Block(index, timestamp, transactions, previousBlockHash);

        this.pendingTransactions = [];  //reset the pendingTransactions for the next block.
        this.chain.push(newBlock);  //push to the blockchain the new block.
        return newBlock;
    },

    createGenesisBlock: function () {
        return new Block(1, 1651730515072, [] , '0');
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
    createNewTransaction: function (sender, recipient, amount) {
        return new Transaction(sender, recipient, amount);
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



    getAddressData: function (address) {
        const addressTransactions = [];
        this.chain.forEach(block => {
            block.transactions.forEach(transaction => {
                if (transaction.sender === address || transaction.recipient === address) {
                    addressTransactions.push(transaction); //push all tranasction by sender or recipient into array.
                }
            });
        });

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

        let allTransaction = this.getAllTransactions();
        let blocks = this.getAllBlocks();

        return {
            addressTransactions: addressTransactions,
            addressBalance: balance,
            amountArr: amountArr,
            allTransaction: allTransaction,
            blocks: blocks,
        };
    },

    //
    mineTransactionInTransactionPool: function (miningRewardAddress) {
        const rewardTx = this.createNewTransaction('system-reward', miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        // const block = this.createNewBlock(this.getLatestBlock().hash);
        const block = new Block(this.chain.length + 1, Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        // reset transaction pool
        this.pendingTransactions = [];
    },

    addTransactionToPendingTransactions: function (transaction) {
        if (!transaction.sender || !transaction.recipient) {
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
        const walletBalance = this.getBalanceOfAddress(transaction.sender);
        if (walletBalance < transaction.amount) {
            console.log('[BlockChain] addTransaction', 'Not enough balance');
            return;
        }

        // Get all other pending transactions for the "from" wallet
        const pendingTxForWallet = this.pendingTransactions
            .filter(tx => tx.sender === transaction.sender);

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
        console.log('[BlockChain] addTransaction', 'transaction added: ' + JSON.stringify(transaction.transactionId));
        return true;
    },

    getBalanceOfAddress: function (address) {
        let balance = 0;

        for (const block of this.chain) {
            let transactions = block.transactions;
            for (const trans of transactions) {
                if (trans.sender === address) {
                    balance -= trans.amount;
                }

                if (trans.recipient === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    },

    getAllBlocks: function () {
        const list = [];
        for (const block of this.chain) {
            list.push(block);
        }

        return list;
    },

    getAllTransactions: function () {
        const txs = [];
        for (const block of this.chain) {
            let transactions = block.transactions;
            for (const tx of transactions) {
                txs.push(tx);
            }
        }

        return txs;
    },

    getAllTransactionsForWallet: function (address) {
        const txs = [];

        for (const block of this.chain) {
            let transactions = block.transactions;
            for (const tx of transactions) {
                if (tx.sender === address || tx.recipient === address) {
                    txs.push(tx);
                }
            }
        }

        console.log('get transactions for wallet count: ' + txs.length);
        return txs;
    },


});

module.exports = BlockChain;