const sha256 = require('js-sha256').sha256;

function Miner() {
    var self = this;
    this.chain = [];
    this.difficulty = 0;

    this.start = function () {
        mergeChain();
        loadDifficulty();
    }
    this.mine = function (block) {
        let retval = false;
        let previousBlock = self.chain.length == 0 ? null : self.chain[self.chain.length - 1];
        previousBlockHash = previousBlock == null ? 'genesis' : previousBlock.hash;
        block.previousHash = previousBlockHash;

        for (let nonce = 0; nonce < Number.MAX_VALUE; nonce++) {
            let hashSample = calculateHash(block, nonce);
            if (hashSample.startsWith("0".repeat(self.difficulty))) {
                retval = true;
                block.hash = hashSample;
                block.nonce = nonce;
                block.difficulty = self.difficulty;
                self.chain.push(block);
                break;
            }
        }
        return retval;
    }
    this.verifyChain = function () {
        var retval = true;
        if (self.chain.length > 1) {
            for (let index = 1; index < self.chain.length; index++) {
                const block = self.chain[index];
                const previouseBlock = self.chain[index - 1];
                if (block.previousHash != previouseBlock.hash
                    || calculateHash(block, block.nonce) != block.hash) {
                    retval = false;
                    break;
                }
            }
        }
        return retval;
    }
    function calculateHash(block, nonce) {
        return sha256(block.previousHash + JSON.stringify(block.data) + block.time + nonce);
    }
    function mergeChain() {
        self.chain = [];
    }
    function loadDifficulty() {
        self.difficulty = 5;
    }
}
module.exports = Miner;
