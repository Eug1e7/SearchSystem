import { SearchRepository } from "../repositories/SearchRepository";

// データ取得のロジックを記述
export class GetService {
    // 検索履歴を取得
    static async getSearchWords(): Promise<string[]> {
        try {
            return await SearchRepository.findAll();
        } catch (error) {
            console.error("Error getting data:", error);
        }
    }

    // スコア以上のhashを取得し、重複を排除
    static async getScoreHash(score: number): Promise<string[]> {
        try {
            const hashes = await SearchRepository.findHashes(score);
            if (hashes.length === 0) {
                console.log("No hashes found for the given score.");
                return [];
            }

            // Setを使用して重複を排除し、再び配列に変換
            const uniqueHashes = Array.from(new Set(hashes));
            return uniqueHashes;
        } catch (error) {
            console.error("Error getting data:", error);
            return [];
        }
    }

    // hashに対応するtextを取得
    static async getScoreText(hashes: string[]): Promise<string[]> {
        try {
            const texts = await SearchRepository.findTexts(hashes);
            return texts;
        } catch (error) {
            console.error("Error getting data:", error);
        }
    }

    // hashに対応するwordを取得
    static async getScoreWords(hashes: string[]): Promise<string[]> {
        try {
            const words = await SearchRepository.findWords(hashes);
            return words;
        } catch (error) {
            console.error("Error getting data:", error);
        }
    }
}
