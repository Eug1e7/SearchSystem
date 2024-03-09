import { GetService } from "./GetService";

export class GetScoreQuestionService {
    // スコア以上のhashを取得
    static async sortQuestionScore(score: number): Promise<string[]> {
        const hashes = await GetService.getScoreHash(score);
        const questions = await GetService.getScoreQuestions(hashes);
        return questions;
    }
}