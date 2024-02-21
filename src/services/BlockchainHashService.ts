import { Block } from "../models/Block";
import { Blockchain } from "../models/Blockchain";

export class BlockchainHashService {
    blockchain: Blockchain;

    constructor() {
        this.blockchain = new Blockchain();
    }

    generateBlockchainHash(): Promise<string> {
        const newBlock = new Block(this.blockchain.obtainLatestBlock().index + 1, new Date().toISOString(), "Block Data");
        this.blockchain.addNewBlock(newBlock);
        const uniqueId: string = newBlock.hash;
        return Promise.resolve(uniqueId);
    }
}
