"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRepository = void 0;
const DataSource_1 = require("../DataSource");
const KeyWord_1 = require("../entity/KeyWord");
const Search_1 = require("../entity/Search");
class SearchRepository {
    static save1(hash, word, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DataSource_1.AppDataSource.createQueryBuilder().insert().into(Search_1.Search).values([{ hash, word, response }]).execute();
            }
            catch (error) {
                console.error("Error saving data:", error);
            }
        });
    }
    static save2(keyPhrases) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keywordValues = keyPhrases.map((kp) => ({ hash: kp.hash, text: kp.text, score: kp.score }));
                yield DataSource_1.AppDataSource.createQueryBuilder().insert().into(KeyWord_1.KeyWord).values(keywordValues).execute();
            }
            catch (error) {
                console.error("Error saving data:", error);
            }
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRepository = DataSource_1.AppDataSource.getRepository(Search_1.Search);
            const searches = yield searchRepository.find();
            return searches.map((search) => search.word);
        });
    }
}
exports.SearchRepository = SearchRepository;
//# sourceMappingURL=SearchRepository.js.map