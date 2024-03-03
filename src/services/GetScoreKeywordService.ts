import { GetService } from "./GetService";

export class GetScoreKeywordService {
    // Score以上のtextを取得
    static async sortTextScore(score: number): Promise<string[]> {
        const texts = await GetService.getScoreText(score);
        return texts;
    }
}
// Compare this snippet from src/services/SearchService.ts: