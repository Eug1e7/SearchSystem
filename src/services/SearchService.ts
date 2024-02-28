import { BlockchainHashService } from "./BlockchainHashService";
import { ChatService } from "./ChatService";
import { ExtractKeyPhrases } from "./ExtractKeyPhrases";
import { SaveService } from "./SaveService";

export class SearchService {
    async performSearch(word) {
        const hash = await new BlockchainHashService().generateBlockchainHash();
        const response = await ChatService.searchGpt(word);
        const keyPhrases = await ExtractKeyPhrases.extractKeyPhrases(word, hash);
        await SaveService.saveSearchWord(hash, word, response, keyPhrases);
        return { hash, response, keyPhrases }; // 必要なデータを返す
    }
}
