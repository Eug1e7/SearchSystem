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
exports.ChatService = void 0;
class ChatService {
    static searchGpt(word) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sendChat = (text, chatGptApiKey) => __awaiter(this, void 0, void 0, function* () {
                    const endPoint = "https://api.openai.com/v1/chat/completions";
                    const modelName = "gpt-3.5-turbo";
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
                    const response = yield fetch(endPoint, requestOptions);
                    // HTTPステータスコードが200番台以外の場合はエラーとして扱う
                    if (!response.ok) {
                        console.error("HTTP Error Response:", response.status, response.statusText);
                        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                    }
                    const json = yield response.json();
                    // レスポンスの構造をチェック
                    if (json.choices && json.choices.length > 0 && json.choices[0].message) {
                        // メッセージ内容を取得
                        let content = json.choices[0].message.content;
                        // 「。」がある場合にそれを「。\n」に置換して改行を挿入
                        let modifiedContent = content.replace(/。/g, "。\n");
                        console.log(modifiedContent);
                        return modifiedContent;
                    }
                    else {
                        // エラーメッセージまたは予期しないレスポンス構造をログに記録
                        console.error("Unexpected response structure:", JSON.stringify(json, null, 2));
                        throw new Error("Unexpected response structure.");
                    }
                });
                const result = yield sendChat(word, process.env.CHAT_GPT_API_KEY);
                console.log(`Searching GPT for word: ${word}, Result: ${result}`);
                return result;
            }
            catch (error) {
                console.error("Error searching GPT:", error);
                throw error;
            }
        });
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=ChatService.js.map