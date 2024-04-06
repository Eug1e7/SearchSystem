// Search-system\SearchSystemAPI\src\repositories\UnderstandRepository.ts

// KeyWordRepository.ts

import { AppDataSource } from "../DataSource";
import { KeyWord } from "../entity/KeyWord";

export class KeyWordRepository {
    static async findByHashSortedByScore(hash: string): Promise<KeyWord[]> {
        const keywordRepository = AppDataSource.getRepository(KeyWord);
        return keywordRepository.find({
            where: { hash },
            order: { score: "DESC" }
        });
    }
}
