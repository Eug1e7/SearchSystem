// Search-system\SearchSystemAPI\src\services\SaveService.ts

import { SearchRepository } from "../repositories/SearchRepository";

export class SaveService {
    static async saveSearchQuestion(createdAt, saveSearchQuestionInVo, keyPhrases, saveUnderstand): Promise<void> {
        try {
            const result = await SearchRepository.executeTransaction(saveSearchQuestionInVo, keyPhrases, saveUnderstand, createdAt);
            if (result !== "") {
                console.error(result);
                // エラーメッセージが返された場合は、処理をここで停止します。
                // 必要に応じて、さらに適切なエラー処理を行うこともできます。
            }
        } catch (error) {
            console.error("Error during saveSearchQuestion:", error);
            // エラーが発生した場合の処理をここに記述します。
            // 例えば、エラーメッセージをログに記録する、エラー応答をクライアントに送信するなどです。
        }
    }
}
