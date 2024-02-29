import { BlockchainHashService } from "./BlockchainHashService";
import { ChatService } from "./ChatService";
import { ExtractKeyPhrases } from "./ExtractKeyPhrases";
import { SaveService } from "./SaveService";

export class SearchService {
    async performSearch(word) {
        // ハッシュを生成
        const hash = await new BlockchainHashService().generateBlockchainHash();
        // GPT-3を使って検索
        const response = await ChatService.searchGpt(word);
        // キーフレーズを抽出
        const keyPhrases = await ExtractKeyPhrases.extractKeyPhrases(word, hash);
        // 検索履歴を保存
        await SaveService.saveSearchWord(hash, word, response, keyPhrases);
        return { hash, response, keyPhrases };
    }
}
