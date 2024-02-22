"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const KeyWord_1 = require("./entity/KeyWord");
const Search_1 = require("./entity/Search");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Search_1.Search, KeyWord_1.KeyWord],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=DataSource.js.map