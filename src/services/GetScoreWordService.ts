import { GetService } from "./GetService";

export class GetScoreWordService {
    // スコア以上のhashを取得
    static async sortWordScore(score: number): Promise<string[]> {
        const hashes = await GetService.getScoreHash(score);
        const words = await GetService.getScoreWords(hashes);
        return words;
    }
}