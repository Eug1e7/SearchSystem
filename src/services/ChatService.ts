export class ChatService {
    // GPT-3を使って検索
    static async searchGpt(word: string): Promise<any> {
        try {
            const sendChat = async (text, chatGptApiKey) => {
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

                    console.log(modifiedContent);
                    return modifiedContent;
                } else {
                    // エラーメッセージまたは予期しないレスポンス構造をログに記録
                    console.error("Unexpected response structure:", JSON.stringify(json, null, 2));
                    throw new Error("Unexpected response structure.");
                }
            };
            const result = await sendChat(word, process.env.CHAT_GPT_API_KEY);
            console.log(`Searching GPT for word: ${word}, Result: ${result}`);
            return result;
        } catch (error) {
            console.error("Error searching GPT:", error);
            throw error;
        }
    }
}
