// Search-system\SearchSystemAPI\src\services\ChatService.ts
import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";

export class ChatService {
    // GPT-3を使って検索
    static async searchGpt(question: string): Promise<any> {
        try {
            const sendChat = async (text, chatGptApiKey) => {
                const endPoint = "https://api.openai.com/v1/chat/completions";
                const modelName = "gpt-3.5-turbo-0125";

                const messages = [
                    {
                        role: "user",
                        content: text,
                    },
                ];

                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${chatGptApiKey}`,
                    },
                    body: JSON.stringify({
                        model: modelName,
                        messages: messages,
                        max_tokens: 700,
                    }),
                };

                const response = await fetch(endPoint, requestOptions);
                // HTTPステータスコードが200番台以外の場合はエラーとして扱う
                if (!response.ok) {
                    console.error("HTTP Error Response:", response.status, response.statusText);
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                // レスポンスの構造をチェック
                if (json.choices && json.choices.length > 0 && json.choices[0].message) {
                    // メッセージ内容を取得
                    let content = json.choices[0].message.content;

                    // 「。」がある場合にそれを「。\n」に置換して改行を挿入
                    let modifiedContent = content.replace(/。/g, "。\n");

                    // console.log(modifiedContent);
                    return modifiedContent;
                } else {
                    // エラーメッセージまたは予期しないレスポンス構造をログに記録
                    console.error("Unexpected response structure:", JSON.stringify(json, null, 2));
                    throw new Error("Unexpected response structure.");
                }
            };
            const result = await sendChat(question, process.env.OPENAI_API_KEY);
            // console.log(`Searching GPT for question: ${question}, Result: ${result}`);
            return result;
        } catch (error) {
            console.error("Error searching GPT:", error);
            throw error;
        }
    }

    // 理解度スコアを取得
    static async getUnderstandingScore(question: string, keyPhrases: KeyPhrasesVo): Promise<any> {
        const endpoint = "https://api.openai.com/v1/chat/completions";
        const apiKey = process.env.OPENAI_API_KEY;
        const modelName = "gpt-3.5-turbo-0125";

        let scores = [];

        for (const keyPhrase of keyPhrases) {
            const prompt = `Given the question: "${question}" and the topic: "${keyPhrase.text}", rate the depth of understanding exhibited in the question on a scale from 1 to 5, where 1 is very abstract with little understanding, and 5 is highly detailed and expert-level understanding.`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: modelName,
                    prompt: prompt,
                    temperature: 0.7,
                    max_tokens: 150,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                }),
            });

            const jsonResponse = await response.json();
            const rating = jsonResponse.choices[0].text.trim();

            // ChatGPTの応答から得られた評価スコア（1から5の評価）
            let score: number = parseInt(rating, 10);

            // 応答が無効なスコアを返した場合（NaNなど）、デフォルト値を設定
            if (isNaN(score) || score < 1 || score > 5) {
                score = 1; // 最低スコアをデフォルトとする
            }

            scores.push({ keyPhrase: keyPhrase.text, score: score });
        }

        return scores;
    }
}
