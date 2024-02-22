"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
const SearchController_1 = require("./controllers/SearchController");
const DataSource_1 = require("./DataSource");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/api", SearchController_1.searchRouter);
DataSource_1.AppDataSource.initialize()
    .then(() => {
    // データベース接続が成功した後のロジック
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=App.js.map