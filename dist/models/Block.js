"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const crypto = require("crypto");
class Block {
    constructor(index, timestamp, data, precedingHash = " ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }
    computeHash() {
        return crypto
            .createHash("sha256")
            .update(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data))
            .digest("hex");
    }
}
exports.Block = Block;
//# sourceMappingURL=Block.js.map