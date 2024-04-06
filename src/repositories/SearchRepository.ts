// Search-system\SearchSystemAPI\src\repositories\SearchRepository.ts

import { Between } from "typeorm/find-options/operator/Between";
import { AppDataSource } from "../DataSource";
import { KeyPhrasesVo } from "../Vo/KeyPhrasesVo";
import { SaveSearchQuestionInVo } from "../Vo/SaveSearchQuestionInVo";
import { KeyWord } from "../entity/KeyWord";
import { Search } from "../entity/Search";
import { Understand } from "../entity/Understand";

export class SearchRepository {
    static async executeTransaction(saveSearchQuestionInVo: SaveSearchQuestionInVo, keyPhrases: KeyPhrasesVo, saveUnderstand, createdAt: Date): Promise<string> {
        try {
            await AppDataSource.transaction(async (transactionalEntityManager) => {
                // save1のロジック
                const saveSearchQuestion = new Search();
                saveSearchQuestion.hash = saveSearchQuestionInVo.hash;
                saveSearchQuestion.question = saveSearchQuestionInVo.question;
                saveSearchQuestion.response = saveSearchQuestionInVo.response;
                saveSearchQuestion.category = saveSearchQuestionInVo.category;
                saveSearchQuestion.createdAt = createdAt;
                await transactionalEntityManager.save(saveSearchQuestion);

                // save2のロジック
                const keywordValues = keyPhrases.map((kp) => {
                    let keyword = new KeyWord();
                    keyword.hash = kp.hash;
                    keyword.keyPhrase = kp.text;
                    keyword.score = kp.score;
                    keyword.createdAt = createdAt;
                    return keyword;
                });
                await transactionalEntityManager.save(keywordValues);

                // save3のロジック
                const understandValues = saveUnderstand.understandingScore.map((understanding) => {
                    const understand = new Understand();
                    understand.hash = saveUnderstand.hash;
                    understand.keyPhrase = understanding.keyPhrase;
                    understand.understandingScore = understanding.score;
                    understand.createdAt = new Date(saveUnderstand.createdAt);
                    return understand;
                });

                await transactionalEntityManager.save(understandValues);
            });
            return "";
        } catch (error) {
            console.error("Error executing transaction:", error);
            return `Error executing transaction: ${error.message}`;
        }
    }

    // 検索履歴を取得
    static async findAllFiltered(startDate?: string, endDate?: string, category?: string): Promise<Search[]> {
        const searchRepository = AppDataSource.getRepository(Search);
        let whereCondition = {};

        if (startDate && endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59);
            whereCondition["createdAt"] = Between(new Date(startDate), endOfDay);
        }

        // カテゴリーフィルタリングの条件を追加
        if (category && category !== "") {
            whereCondition["category"] = category;
        }

        return await searchRepository.find({
            where: whereCondition,
            order: { createdAt: "DESC" },
        });
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

    // hashに対応するquestionを取得
    static async findQuestions(hashes: string[]): Promise<string[]> {
        const searchRepository = AppDataSource.getRepository(Search);
        const queryBuilder = searchRepository.createQueryBuilder("question").select("question.question").where("question.hash IN (:...hashes)", { hashes });

        const sql = queryBuilder.getSql();
        const parameters = queryBuilder.getParameters();
        console.log("Executing SQL:", sql, "with parameters:", parameters);

        const questions = await queryBuilder.getRawMany();
        // console.log("Questions:", questions);
        return questions.map((question) => question.question_question);
    }
}
