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
exports.ExtractKeyPhrases = void 0;
const axios_1 = require("axios");
class ExtractKeyPhrases {
    static extractKeyPhrases(word, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const Authorization = process.env.YAHOO_API_KEY;
            const url = "https://jlp.yahooapis.jp/KeyphraseService/V2/extract?appid=" + Authorization;
            const data = {
                id: hash,
                jsonrpc: "2.0",
                method: "jlp.keyphraseservice.extract",
                params: {
                    q: word,
                },
            };
            try {
                const response = yield axios_1.default.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // レスポンスの構造を確認
                if (response && response.data && response.data.result && response.data.result.phrases) {
                    const phrases = response.data.result.phrases;
                    const keyPhrases = phrases.map((phrase) => ({
                        text: phrase.text,
                        score: phrase.score,
                        id: response.data,
                    }));
                    return keyPhrases;
                }
                else {
                    // レスポンスの形式が期待と異なる場合
                    console.error("Unexpected response structure:", response);
                    return [];
                }
            }
            catch (error) {
                console.error("Error making the API request:", error);
                return [];
            }
        });
    }
}
exports.ExtractKeyPhrases = ExtractKeyPhrases;
//# sourceMappingURL=ExtractKeyPhrases.js.map