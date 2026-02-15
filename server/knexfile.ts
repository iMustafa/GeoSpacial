import type { Knex } from "knex";
import type { PropertyRaw } from "@maat/api-types";

declare module 'knex/types/tables' {
    interface Tables {
        properties: PropertyRaw;
    }
}

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'password',
            database: process.env.DB_NAME || 'test_db',
            port: Number(process.env.DB_PORT) || 3306
        },
        migrations: {
            directory: "./migrations",
            extension: "ts"
        },
        seeds: {
            directory: "./seeds",
            extension: "ts"
        }
    }
};

export default config;
