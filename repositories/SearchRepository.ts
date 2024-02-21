import { AppDataSource } from "../src/DataSource";
import { KeyPhrasesVo } from "../src/Vo/KeyPhrasesVo";
import { KeyWord } from "../src/entity/KeyWord";
import { Search } from "../src/entity/Search";

export class SearchRepository {
    static async save1(hash: string, word: string, response: string): Promise<void> {
        try {
            await AppDataSource.createQueryBuilder().insert().into(Search).values([{ hash, word, response }]).execute();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }

    static async save2(keyPhrases: KeyPhrasesVo): Promise<void> {
        try {
            const keywordValues = keyPhrases.map((kp) => ({ hash: kp.hash, text: kp.text, score: kp.score }));
            await AppDataSource.createQueryBuilder().insert().into(KeyWord).values(keywordValues).execute();
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
