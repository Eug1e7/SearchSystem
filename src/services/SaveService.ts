import { SearchRepository } from "../repositories/SearchRepository";

export class SaveService {
    // 検索履歴を保存
    static async saveSearchWord(createdAt, saveSearchWordInVo, keyPhrases, understandingScore): Promise<void> {
        // データ保存のロジック
        try {
            await SearchRepository.save1(saveSearchWordInVo, createdAt, understandingScore);
            await SearchRepository.save2(keyPhrases, createdAt);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }
}
