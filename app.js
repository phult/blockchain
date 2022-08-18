require('log-timestamp');


var Block = require('./block');
var block1 = Block.create({'message': 'this is genesis block'});
var block2 = Block.create({
    'from': 'walletAddressA',
    'to': 'walletAddressB',
    'signature': 'SHA256',
    'transaction': { 'from': 'A', 'to': 'B', 'value': 100 }
});

var Miner = require('./miner');
var miner = new Miner();
miner.start();

miner.mine(block1);
miner.mine(block2);
console.log(miner.chain);

console.log(miner.verifyChain());

// var result = miner.mine(block);
// miner.publish(miner.chain);

//miner.merge(chain);

