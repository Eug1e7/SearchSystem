import { Block } from './Block';

class Blockchain {
    blockchain: Block[];

    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }

    startGenesisBlock(): Block {
        return new Block(0, "01/01/2020", "Initial Block in the Chain", "0");
    }

    obtainLatestBlock(): Block {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock: Block): void {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    }
}

export { Blockchain };