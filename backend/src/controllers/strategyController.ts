import { Request, Response } from 'express';
import { generateStrategyAI } from '../services/aiService';
import { saveStrategy, getStrategyById } from '../services/databaseService';
import { BusinessProfile } from '../types';

export const generateStrategy = async (req: Request, res: Response) => {
    try {
        const business: BusinessProfile = req.body;

        // Comprehensive validation for all required fields
        const requiredFields = ['name', 'industry', 'niche', 'audience', 'goals', 'challenges'];
        const missingFields: string[] = [];
        const emptyFields: string[] = [];

        for (const field of requiredFields) {
            const value = business[field as keyof BusinessProfile];

            if (!value) {
                missingFields.push(field);
            } else if (typeof value === 'string' && value.trim().length === 0) {
                emptyFields.push(field);
            }
        }

        if (missingFields.length > 0 || emptyFields.length > 0) {
            const errors: string[] = [];
            if (missingFields.length > 0) {
                errors.push(`Missing required fields: ${missingFields.join(', ')}`);
            }
            if (emptyFields.length > 0) {
                errors.push(`Empty fields not allowed: ${emptyFields.join(', ')}`);
            }

            console.error('❌ Validation failed:', errors);
            return res.status(400).json({
                error: 'Validation failed',
                details: errors
            });
        }

        console.log('✅ Validation passed for business:', business.name);

        const strategy = await generateStrategyAI(business);

        // Save to database
        const userId = (req as any).user.uid;
        const email = (req as any).user.email || 'no-email@provided.com';
        await saveStrategy(strategy, business, userId, email);

        res.json(strategy);
    } catch (error: any) {
        console.error('❌ Error in generateStrategy controller:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const getStrategy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const strategy = await getStrategyById(id);

        if (!strategy) {
            return res.status(404).json({ error: 'Strategy not found' });
        }

        res.json(strategy);
    } catch (error: any) {
        console.error('Error in getStrategy controller:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};
