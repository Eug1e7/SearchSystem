import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";
import { SearchRepository } from "../repositories/SearchRepository";

export class SaveService {
    static async saveSearchWord(hash: string, word: string, response: string, keyPhrases: KeyPhrasesVo): Promise<void> {
        // データ保存のロジック
        try {
            await SearchRepository.save1(hash, word, response);
            await SearchRepository.save2(keyPhrases);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }
}
