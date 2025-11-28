import cron from 'node-cron';
import { query } from '../config/database';
import { generateStrategyAI } from './aiService';
import { saveStrategy } from './databaseService';
import { BusinessProfile, Strategy } from '../types';

// Run every Monday at 9:00 AM
const CRON_SCHEDULE = '0 9 * * 1';

export const startWeeklyUpdates = () => {
    console.log('📅 Weekly strategy update cron job initialized');

    cron.schedule(CRON_SCHEDULE, async () => {
        console.log('🔄 Running weekly strategy updates...');

        try {
            // Get all businesses that need updates
            const result = await query(`
        SELECT DISTINCT b.id, b.user_id, b.name, b.industry, b.niche, b.audience, b.goals, b.challenges
        FROM businesses b
        JOIN strategies s ON b.id = s.business_id
        WHERE s.generated_at < NOW() - INTERVAL '7 days'
        ORDER BY s.generated_at ASC
      `);

            console.log(`Found ${result.rows.length} businesses to update`);

            for (const row of result.rows) {
                try {
                    const business: BusinessProfile = {
                        name: row.name,
                        industry: row.industry,
                        niche: row.niche,
                        audience: row.audience,
                        goals: row.goals,
                        challenges: row.challenges
                    };

                    console.log(`Updating strategy for: ${business.name}`);

                    const newStrategy = await generateStrategyAI(business);
                    // We use the existing user_id. Email is not strictly needed for updates as user exists.
                    await saveStrategy(newStrategy, business, row.user_id, 'cron-update@system.local');

                    console.log(`✅ Updated strategy for: ${business.name}`);
                } catch (error) {
                    console.error(`❌ Failed to update ${row.name}:`, error);
                }
            }

            console.log('✨ Weekly update completed');
        } catch (error) {
            console.error('Error in weekly update cron:', error);
        }
    });
};

// Manual trigger for testing
export const triggerWeeklyUpdate = async () => {
    console.log('🔄 Manually triggering weekly update...');

    try {
        const result = await query(`
      SELECT DISTINCT b.id, b.user_id, b.name, b.industry, b.niche, b.audience, b.goals, b.challenges
      FROM businesses b
      JOIN strategies s ON b.id = s.business_id
      ORDER BY s.generated_at ASC
      LIMIT 5
    `);

        for (const row of result.rows) {
            const business: BusinessProfile = {
                name: row.name,
                industry: row.industry,
                niche: row.niche,
                audience: row.audience,
                goals: row.goals,
                challenges: row.challenges
            };

            const newStrategy = await generateStrategyAI(business);
            await saveStrategy(newStrategy, business, row.user_id, 'manual-update@system.local');

            console.log(`✅ Updated: ${business.name}`);
        }

        return { success: true, count: result.rows.length };
    } catch (error) {
        console.error('Error in manual update:', error);
        throw error;
    }
};
