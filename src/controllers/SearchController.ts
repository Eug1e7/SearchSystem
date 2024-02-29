import { Request, Response, Router } from "express";
import { GetScoreKeywordService } from "../services/GetScoreKeywordService";
import { GetScoreWordService } from "../services/GetScoreWordService";
import { GetService } from "../services/GetService";
import { SearchService } from "../services/SearchService";

export const searchRouter = Router();

// 検索API
searchRouter.post("/search", async (req: Request, res: Response) => {
    const { word } = req.body;
    try {
        const searchService = new SearchService();
        const result = await searchService.performSearch(word);
        console.log(`Result: `, result);
        res.status(201).send(result.response);
    } catch (error) {
        console.error("Error in search:", error);
        res.status(500).send(error.message);
    }
});

// 検索履歴を取得
searchRouter.get("/searches", async (req: Request, res: Response) => {
    try {
        const searches = await GetService.getSearchWords();
        res.status(200).send(searches);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Score以上のtextを取得
searchRouter.get("/score_text", async (req: Request, res: Response) => {
    // クエリパラメータからスコアを取得し、数値に変換
    const score = parseInt(req.query.score as string, 10);

    // 数値変換が正常かつ数値であることを確認
    if (isNaN(score)) {
        return res.status(400).send("Score parameter is required and must be a number.");
    }

    try {
        const texts = await GetScoreKeywordService.sortTextScore(score);
        res.status(200).send(texts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Score以上のtextを含むwordを取得
searchRouter.get("/score_word", async (req: Request, res: Response) => {
    // クエリパラメータからスコアを取得し、数値に変換
    const score = parseInt(req.query.score as string, 10);

    // 数値変換が正常かつ数値であることを確認
    if (isNaN(score)) {
        return res.status(400).send("Score parameter is required and must be a number.");
    }

    try {
        const words = await GetScoreWordService.sortWordScore(score);
        res.status(200).send(words);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
