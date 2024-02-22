"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainHashService = void 0;
const Block_1 = require("../models/Block");
const Blockchain_1 = require("../models/Blockchain");
class BlockchainHashService {
    constructor() {
        this.blockchain = new Blockchain_1.Blockchain();
    }
    generateBlockchainHash() {
        const newBlock = new Block_1.Block(this.blockchain.obtainLatestBlock().index + 1, new Date().toISOString(), "Block Data");
        this.blockchain.addNewBlock(newBlock);
        const uniqueId = newBlock.hash;
        return Promise.resolve(uniqueId);
    }
}
exports.BlockchainHashService = BlockchainHashService;
//# sourceMappingURL=BlockchainHashService.js.map