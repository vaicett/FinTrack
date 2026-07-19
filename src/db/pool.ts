import { Pool } from "pg";
import { config } from "../config";

export const pool = new Pool({
    connectionString: config.databaseUrl,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
    console.error('Unexpected pool error', err);
});

export async function checkConnection(): Promise<void> {
    const res = await pool.query<{ now: Date }>('SELECT NOW()');
    const row = res.rows[0];
    if (!row) {
        throw new Error('DB check failed: empty result');
    }
    console.log('DB connected: ', row.now);
}