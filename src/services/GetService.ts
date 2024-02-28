import { SearchRepository } from "../repositories/SearchRepository";

export class GetService {
    static async getSearchWords(): Promise<string[]> {
        // データ取得のロジック
        try {
            return await SearchRepository.findAll();
        } catch (error) {
            console.error("Error getting data:", error);
        }
    }
}
