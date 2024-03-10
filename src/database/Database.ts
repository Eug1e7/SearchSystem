// Search-system\SearchSystemAPI\src\database\Database.ts

import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

export class Database {
    private static connection: mysql.Connection;

    public static async getConnection(): Promise<mysql.Connection> {
        if (!Database.connection) {
            const port = parseInt(process.env.DB_PORT);
            Database.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: isNaN(port) ? 3306 : port,
            });
            console.log("Successfully connected to the database.");
        }
        return Database.connection;
    }
}
