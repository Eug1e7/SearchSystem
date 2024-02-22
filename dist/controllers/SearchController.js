"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = require("express");
const BlockchainHashService_1 = require("../services/BlockchainHashService");
const SearchService_1 = require("../services/SearchService");
const ChatService_1 = require("../services/ChatService");
const ExtractKeyPhrases_1 = require("../services/ExtractKeyPhrases");
exports.searchRouter = (0, express_1.Router)();
// 検索API
exports.searchRouter.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { word } = req.body;
    let response;
    let hash;
    let keyPhrases = [];
    try {
        try {
            // ブロックチェーンのハッシュを生成
            const service = new BlockchainHashService_1.BlockchainHashService();
            hash = yield service.generateBlockchainHash();
        }
        catch (error) {
            console.error("Error generating hash:", error);
            return;
        }
        try {
            // GPT-3.5で検索
            response = yield ChatService_1.ChatService.searchGpt(word);
        }
        catch (error) {
            console.error("Error searching GPT:", error);
            return;
        }
        try {
            // キーフレーズ抽出&保存
            keyPhrases = yield ExtractKeyPhrases_1.ExtractKeyPhrases.extractKeyPhrases(word, hash);
        }
        catch (error) {
            console.error("Error extracting key phrases:", error);
            return;
        }
        // データ保存
        yield SearchService_1.SearchService.saveSearchWord(hash, word, response, keyPhrases);
        console.log(`Response ${response}, Word ${word}, hash ${hash}`);
        res.status(201).send(response);
    }
    catch (error) {
        res.status(500).send(error.message);
        return;
    }
}));
// 検索履歴を取得
exports.searchRouter.get("/searches", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searches = yield SearchService_1.SearchService.getSearchWords();
        res.status(200).send(searches);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
//# sourceMappingURL=SearchController.js.map