import { SearchRepository } from "../../repositories/SearchRepository";

export class SearchService {
    static async saveSearchWord(hash: string, word: string, response: string): Promise<void> {
        // データ保存のロジック
        try {
            await SearchRepository.save(hash, word, response);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }

    static async getSearchWords(): Promise<string[]> {
        // データ取得のロジック
        try {
            return await SearchRepository.findAll();
        } catch (error) {
            console.error("Error getting data:", error);
        }
    }
}
