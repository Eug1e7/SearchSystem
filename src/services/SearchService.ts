// Search-system\SearchSystemAPI\src\services\SearchService.ts
import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";
import { SaveSearchQuestionInVo } from "../Vo/SaveSearchQuestionInVo";
import { BlockchainHashService } from "./BlockchainHashService";
import { ChatService } from "./ChatService";
import { ExtractKeyPhrases } from "./ExtractKeyPhrases";
import { SaveService } from "./SaveService";

export class SearchService {
    async performSearch(question: string) {
        // 現在の日時を取得
        const createdAt = new Date();
        // ハッシュを生成
        const hash = await new BlockchainHashService().generateBlockchainHash();
        // GPT-3を使って検索
        const response = await ChatService.searchGpt(question);
        // キーフレーズを抽出
        const keyPhrases: KeyPhrasesVo = await ExtractKeyPhrases.extractKeyPhrases(question, hash);
        // 理解度スコアを取得
        const understandingScore: number = await ChatService.getUnderstandingScore(question, keyPhrases);
        // 質問のカテゴリーを分類
        const category = await ChatService.classifyQuestion(question);
        // 検索履歴を保存
        const saveSearchQuestionInVo: SaveSearchQuestionInVo = { hash, question, response, category };
        const saveUnderstand = { hash, understandingScore, createdAt };
        await SaveService.saveSearchQuestion(createdAt, saveSearchQuestionInVo, keyPhrases, saveUnderstand);
        return { hash, response, keyPhrases };
    }
}
