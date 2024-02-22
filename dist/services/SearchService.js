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
exports.SearchService = void 0;
const SearchRepository_1 = require("../repositories/SearchRepository");
class SearchService {
    static saveSearchWord(hash, word, response, keyPhrases) {
        return __awaiter(this, void 0, void 0, function* () {
            // データ保存のロジック
            try {
                yield SearchRepository_1.SearchRepository.save1(hash, word, response);
                yield SearchRepository_1.SearchRepository.save2(keyPhrases);
            }
            catch (error) {
                console.error("Error saving data:", error);
            }
        });
    }
    static getSearchWords() {
        return __awaiter(this, void 0, void 0, function* () {
            // データ取得のロジック
            try {
                return yield SearchRepository_1.SearchRepository.findAll();
            }
            catch (error) {
                console.error("Error getting data:", error);
            }
        });
    }
}
exports.SearchService = SearchService;
//# sourceMappingURL=SearchService.js.map