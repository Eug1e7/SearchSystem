import { AppDataSource } from "../DataSource";
import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";
import { KeyWord } from "../entity/KeyWord";
import { Search } from "../entity/Search";

export class SearchRepository {
    static async save1(hash: string, word: string, response: string): Promise<void> {
        try {
            const queryBuilder = AppDataSource.createQueryBuilder().insert().into(Search).values([{ hash, word, response }]);
            const sql = queryBuilder.getSql();
            const parameters = queryBuilder.getParameters();
            console.log("Executing SQL:", sql, "with parameters:", parameters);
            await queryBuilder.execute();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }

    static async save2(keyPhrases: KeyPhrasesVo): Promise<void> {
        try {
            const keywordValues = keyPhrases.map((kp) => ({ hash: kp.hash, text: kp.text, score: kp.score }));
            const queryBuilder = AppDataSource.createQueryBuilder().insert().into(KeyWord).values(keywordValues);
            const sql = queryBuilder.getSql();
            const parameters = queryBuilder.getParameters();
            console.log("Executing SQL:", sql, "with parameters:", parameters);
            await queryBuilder.execute();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }

    static async findAll(): Promise<string[]> {
        const searchRepository = AppDataSource.getRepository(Search);
        const searches = await searchRepository.find();
        return searches.map((search) => search.word);
    }
}
