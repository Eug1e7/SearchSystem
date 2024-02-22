import { SearchRepository } from "../repositories/SearchRepository";
import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";

export class SearchService {
    static async saveSearchWord(hash: string, word: string, response: string, keyPhrases: KeyPhrasesVo): Promise<void> {
        // データ保存のロジック
        try {
            await SearchRepository.save1(hash, word, response);
            await SearchRepository.save2(keyPhrases);
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
