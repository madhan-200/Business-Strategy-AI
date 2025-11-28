import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const runMigration = async () => {
    console.log('🚀 Starting database migration...');
    console.log('Database URL:', process.env.DATABASE_URL ? 'Loaded' : 'Missing');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        const client = await pool.connect();
        console.log('✅ Connected to database');

        const schemaPath = path.resolve(__dirname, '../../schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('📝 Running schema.sql...');
        await client.query(schemaSql);

        console.log('✨ Migration completed successfully!');
        client.release();
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await pool.end();
    }
};

runMigration();
