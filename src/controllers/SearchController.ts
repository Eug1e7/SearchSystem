import { Request, Response, Router } from "express";
import { BlockchainHashService } from "../services/BlockchainHashService";
import { SearchService } from "../services/SearchService";
import { ChatService } from "../services/ChatService";
import { ExtractKeyPhrases } from "../services/ExtractKeyPhrases";
import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";

export const searchRouter = Router();

// 検索API
searchRouter.post("/search", async (req: Request, res: Response) => {
    const { word } = req.body;
    let response: any;
    let hash: string;
    let keyPhrases: KeyPhrasesVo  = [];
    try {
        try {
            // ブロックチェーンのハッシュを生成
            const service = new BlockchainHashService();
            hash = await service.generateBlockchainHash();
        } catch (error) {
            console.error("Error generating hash:", error);
            return;
        }
        try {
            // GPT-3.5で検索
            response = await ChatService.searchGpt(word);
        } catch (error) {
            console.error("Error searching GPT:", error);
            return;
        }
        try {
            // キーフレーズ抽出&保存
            keyPhrases = await ExtractKeyPhrases.extractKeyPhrases(word, hash);
        } catch (error) {
            console.error("Error extracting key phrases:", error);
            return;
        }
        // データ保存
        await SearchService.saveSearchWord(hash, word, response, keyPhrases);
        console.log(`Response ${response}, Word ${word}, hash ${hash}`);
        res.status(201).send(response);
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
});

// 検索履歴を取得
searchRouter.get("/searches", async (req: Request, res: Response) => {
    try {
        const searches = await SearchService.getSearchWords();
        res.status(200).send(searches);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
