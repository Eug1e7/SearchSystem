// Search-system\SearchSystemAPI\src\services\ExtractKeyPhrases.ts
import axios from "axios";
import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";

export class ExtractKeyPhrases {
    // キーフレーズを抽出
    static async extractKeyPhrases(question: string, hash: string): Promise<KeyPhrasesVo> {
        const Authorization = process.env.YAHOO_API_KEY;
        const url = "https://jlp.yahooapis.jp/KeyphraseService/V2/extract?appid=" + Authorization;
        const data = {
            id: hash,
            jsonrpc: "2.0",
            method: "jlp.keyphraseservice.extract",
            params: {
                q: question,
            },
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // レスポンスの構造を確認
            if (response && response.data && response.data.result && response.data.result.phrases) {
                const phrases = response.data.result.phrases;
                const keyPhrases: KeyPhrasesVo = phrases.map((phrase) => ({
                    text: phrase.text,
                    score: phrase.score,
                    hash: response.data.id,
                }));
                return keyPhrases;
            } else {
                // レスポンスの形式が期待と異なる場合
                console.error("Unexpected response structure:", response);
                return [];
            }
        } catch (error) {
            console.error("Error making the API request:", error);
            return [];
        }
    }
}
