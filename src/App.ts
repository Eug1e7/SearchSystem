// Search-system\SearchSystemAPI\src\App.ts
import * as express from "express";
import "reflect-metadata";
import { searchRouter } from "./controllers/SearchController";
import { AppDataSource } from "./DataSource";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", searchRouter);

AppDataSource.initialize()
    .then(() => {
        // データベース接続が成功した後のロジック
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
