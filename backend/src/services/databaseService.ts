import pool, { query } from '../config/database';
import { Strategy, BusinessProfile } from '../types';

export const saveStrategy = async (strategy: Strategy, businessProfile: BusinessProfile, userId: string, email: string): Promise<void> => {
    try {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Ensure user exists in the database (sync with Firebase auth)
            // In a real app, this might happen via a webhook on signup, but lazy sync works too
            await client.query(
                `INSERT INTO users (id, email, created_at)
             VALUES ($1, $2, CURRENT_TIMESTAMP)
             ON CONFLICT (id) DO NOTHING`,
                [userId, email]
            );

            // Insert or get business
            const businessResult = await client.query(
                `INSERT INTO businesses (user_id, name, industry, niche, audience, goals, challenges)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (user_id, name) DO UPDATE SET
         industry = EXCLUDED.industry,
         niche = EXCLUDED.niche,
         audience = EXCLUDED.audience,
         goals = EXCLUDED.goals,
         challenges = EXCLUDED.challenges,
         updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
                [userId, businessProfile.name, businessProfile.industry, businessProfile.niche,
                    businessProfile.audience, businessProfile.goals, businessProfile.challenges]
            );

            const businessId = businessResult.rows[0].id;

            // Insert strategy
            await client.query(
                `INSERT INTO strategies (
        id, business_id, summary, growth_score, target_audience, 
        marketing_channels, sales_funnel, content_calendar, 
        pricing_strategy, competitors, kpis, generated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [
                    strategy.id,
                    businessId,
                    strategy.summary,
                    strategy.growthScore,
                    JSON.stringify(strategy.targetAudience),
                    JSON.stringify(strategy.marketingChannels),
                    JSON.stringify(strategy.salesFunnel),
                    JSON.stringify(strategy.contentCalendar),
                    JSON.stringify(strategy.pricingStrategy),
                    JSON.stringify(strategy.competitors),
                    JSON.stringify(strategy.kpis),
                    strategy.generatedAt
                ]
            );

            await client.query('COMMIT');
            console.log('✅ Strategy saved to database');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.warn('⚠️ Database not available, strategy will only be saved in browser:', error instanceof Error ? error.message : error);
        // Don't throw - allow the app to continue without database
    }
};

export const getStrategyById = async (id: string): Promise<Strategy | null> => {
    const result = await query(
        `SELECT * FROM strategies WHERE id = $1`,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows[0];

    return {
        id: row.id,
        generatedAt: row.generated_at,
        summary: row.summary,
        growthScore: row.growth_score,
        targetAudience: row.target_audience,
        marketingChannels: row.marketing_channels,
        salesFunnel: row.sales_funnel,
        contentCalendar: row.content_calendar,
        pricingStrategy: row.pricing_strategy,
        competitors: row.competitors,
        kpis: row.kpis
    };
};

export const getLatestStrategy = async (businessName: string): Promise<Strategy | null> => {
    const result = await query(
        `SELECT s.* FROM strategies s
     JOIN businesses b ON s.business_id = b.id
     WHERE b.name = $1
     ORDER BY s.generated_at DESC
     LIMIT 1`,
        [businessName]
    );

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows[0];

    return {
        id: row.id,
        generatedAt: row.generated_at,
        summary: row.summary,
        growthScore: row.growth_score,
        targetAudience: row.target_audience,
        marketingChannels: row.marketing_channels,
        salesFunnel: row.sales_funnel,
        contentCalendar: row.content_calendar,
        pricingStrategy: row.pricing_strategy,
        competitors: row.competitors,
        kpis: row.kpis
    };
};
