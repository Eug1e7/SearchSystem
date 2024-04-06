// Search-system\SearchSystemAPI\src\repositories\UnderstandRepository.ts

import { AppDataSource } from "../DataSource";
import { Understand } from "../entity/Understand";

export class UnderstandRepository {
    static async findByHashSortedByUnderstandingScore(hash: string): Promise<Understand[]> {
        const understandRepository = AppDataSource.getRepository(Understand);
        return understandRepository.find({
            where: { hash },
            order: { understandingScore: "DESC" }
        });
    }
}
