import { AppDataSource } from "../src/DataSource";
import { Search } from "../src/entity/Search";

export class SearchRepository {
    static async save(hash: string, word: string, response: string): Promise<void> {
        try {
            await AppDataSource.createQueryBuilder().insert().into(Search).values([{ hash, word, response }]).execute();
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
