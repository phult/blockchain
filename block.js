class Block {
    constructor() {
        this.hash = 'SHA256';
        this.previousHash = 'SHA256';
        this.time = 0;
        this.data = {
            'from': 'walletAddressA',
            'to': 'walletAddressB',
            'signature': 'SHA256',
            'transaction': { 'from': 'A', 'to': 'B', 'value': 100 }
        };
        //mining features
        this.nonce = -1;
        this.difficulty = -1;
    }
    static create(data) {
        let block = new Block();
        block.data = data;
        block.time = Date.now();
        return block;
    }
}

module.exports = Block;
