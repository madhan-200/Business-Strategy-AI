import { Request, Response } from 'express';
import { generateStrategyAI } from '../services/aiService';
import { saveStrategy, getStrategyById } from '../services/databaseService';
import { BusinessProfile } from '../types';

export const generateStrategy = async (req: Request, res: Response) => {
    try {
        const business: BusinessProfile = req.body;

        if (!business.name || !business.industry) {
            return res.status(400).json({ error: 'Missing required business fields' });
        }

        const strategy = await generateStrategyAI(business);

        // Save to database
        const userId = (req as any).user.uid;
        const email = (req as any).user.email || 'no-email@provided.com';
        await saveStrategy(strategy, business, userId, email);

        res.json(strategy);
    } catch (error: any) {
        console.error('Error in generateStrategy controller:', error);
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
