import { AppDataSource } from "../DataSource";
import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";
import { KeyWord } from "../entity/KeyWord";
import { Search } from "../entity/Search";

export class SearchRepository {
    // 検索結果を保存
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

    // キーワードを保存
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

    // 検索履歴を取得
    static async findAll(): Promise<string[]> {
        const searchRepository = AppDataSource.getRepository(Search);
        const searches = await searchRepository.find();
        return searches.map((search) => search.word);
    }

    // スコア以上のhashを取得
    static async findHashes(score: number): Promise<string[]> {
        const keywordRepository = AppDataSource.getRepository(KeyWord);
        const queryBuilder = keywordRepository.createQueryBuilder("keyword").select("keyword.hash").where("keyword.score >= :score", { score: score });

        const sql = queryBuilder.getSql();
        const parameters = queryBuilder.getParameters();
        console.log("Executing SQL:", sql, "with parameters:", parameters);

        const hashes = await queryBuilder.getRawMany();
        // console.log("Hashes:", hashes);
        return hashes.map((hash) => hash.keyword_hash);
    }

    // score以上のtextを取得
    static async findTexts(score: number): Promise<string[]> {
        const keywordRepository = AppDataSource.getRepository(KeyWord);
        const queryBuilder = keywordRepository.createQueryBuilder("keyword").select("keyword.text").where("keyword.score >= :score", { score });

        const sql = queryBuilder.getSql();
        const parameters = queryBuilder.getParameters();
        console.log("Executing SQL:", sql, "with parameters:", parameters);

        const texts = await queryBuilder.getRawMany();
        // console.log("Texts:", texts);
        return texts.map((text) => text.keyword_text);
    }

    // keywordからhashを取得
    static async findHashesByKeyword(keyword: string): Promise<string[]> {
        const keywordRepository = AppDataSource.getRepository(KeyWord);
        const queryBuilder = keywordRepository
            .createQueryBuilder("keyword")
            .select("keyword.hash")
            .where("LOWER(keyword.text) LIKE LOWER(:keyword)", { keyword: `%${keyword}%` });

        const sql = queryBuilder.getSql();
        const parameters = queryBuilder.getParameters();
        console.log("Executing SQL:", sql, "with parameters:", parameters);

        const hashes = await queryBuilder.getRawMany();
        console.log("Hashes:", hashes);
        return hashes.map((hash) => hash.keyword_hash);
    }

    // hashに対応するwordを取得
    static async findWords(hashes: string[]): Promise<string[]> {
        const searchRepository = AppDataSource.getRepository(Search);
        const queryBuilder = searchRepository.createQueryBuilder("word").select("word.word").where("word.hash IN (:...hashes)", { hashes });

        const sql = queryBuilder.getSql();
        const parameters = queryBuilder.getParameters();
        console.log("Executing SQL:", sql, "with parameters:", parameters);

        const words = await queryBuilder.getRawMany();
        // console.log("Words:", words);
        return words.map((word) => word.word_word);
    }
}
