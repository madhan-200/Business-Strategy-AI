import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const checkDb = async () => {
    console.log('🔍 Checking Database Connection...');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        const client = await pool.connect();
        const res = await client.query('SELECT NOW() as time, current_database() as db_name');
        console.log('✅ Database Connected Successfully!');
        console.log('📅 Server Time:', res.rows[0].time);
        console.log('🗄️ Database Name:', res.rows[0].db_name);

        // Check tables
        const tables = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('📊 Tables found:', tables.rows.map(r => r.table_name).join(', '));

        client.release();
    } catch (error) {
        console.error('❌ Database Connection Failed:', error);
    } finally {
        await pool.end();
    }
};

checkDb();
