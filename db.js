import { Pool } from "pg";
import "dotenv/config";

export const db = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});