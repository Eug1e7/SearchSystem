"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const Block_1 = require("./Block");
class Blockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }
    startGenesisBlock() {
        return new Block_1.Block(0, "01/01/2020", "Initial Block in the Chain", "0");
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=Blockchain.js.map