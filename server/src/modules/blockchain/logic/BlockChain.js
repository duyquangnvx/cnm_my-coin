const cc = require("../../../base/CCClass");
const Block = require("./Block");
const Transaction = require("./Transaction");

/**
 *
 * @param {Block[]} chain
 * @param {Transaction[]} transactionPool
 * @param {number} difficulty
 * @param {number} miningReward
 */
const BlockChain = cc.Class.extend({
    aksf: 1,
    ctor: function () {
        this.chain = [this.createGenesisBlock()];
        this.transactionPool = [];
        this.difficulty = 5;
        this.miningReward = 100;
    },

    createGenesisBlock: function () {
        return new Block(Date.parse('2022-04-03'), [], '0');
    },

    getLatestBlock: function () {
        return this.chain[this.chain.length - 1];
    },

    mineTransactionInTransactionPool: function (miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.transactionPool.push(rewardTx);

        const block = new Block(Date.now(), this.transactionPool, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        // reset transaction pool
        this.transactionPool = [];
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
        const pendingTxForWallet = this.transactionPool
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


        this.transactionPool.push(transaction);
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
    }
});

module.exports = BlockChain;