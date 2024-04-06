// Search-system\SearchSystemAPI\src\services\GetKeywordService.ts

import { GetService } from "./GetService";

export class GetKeywordService {
    // Score以上のtextを取得
    static async sortTextScore(score: number): Promise<string[]> {
        const texts = await GetService.getScoreText(score);
        return texts;
    }
}