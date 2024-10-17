import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
});

(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Base de datos conectada:', result.rows[0].now);
    } catch (error) {
        console.error('Error:', error);
    }
})();
