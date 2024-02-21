import { DataSource } from "typeorm";
import { Search } from "./entity/Search";
import "dotenv/config";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Search],
    subscribers: [],
    migrations: [],
});
