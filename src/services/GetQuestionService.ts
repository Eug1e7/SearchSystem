// Search-system\SearchSystemAPI\src\services\GetQuestionService.ts

import { GetService } from "./GetService";

export class GetQuestionService {
    // スコア以上のhashを取得
    static async sortQuestionScore(score: number): Promise<string[]> {
        const hashes = await GetService.getScoreHash(score);
        const questions = await GetService.getScoreQuestions(hashes);
        return questions;
    }
}