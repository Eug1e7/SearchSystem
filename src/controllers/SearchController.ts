import { Request, Response, Router } from "express";
import { SearchService } from "../services/SearchService";
import { GetService } from "../services/GetService";

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
