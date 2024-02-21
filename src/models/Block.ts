import * as crypto from "crypto";

class Block {
    index: number;
    timestamp: string;
    data: string;
    precedingHash: string;
    hash: string;

    constructor(index: number, timestamp: string, data: string, precedingHash = " ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }

    computeHash(): string {
        return crypto
            .createHash("sha256")
            .update(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data))
            .digest("hex");
    }
}

export { Block };
