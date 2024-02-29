import { GetService } from "./GetService";

export class GetScoreKeywordService {
    // スコア以上のhashを取得
    static async sortTextScore(score: number): Promise<string[]> {
        const hashes = await GetService.getScoreHash(score);
        const texts = await GetService.getScoreText(hashes);
        return texts;
    }
}
// Compare this snippet from src/services/SearchService.ts: