import { Request, Response } from 'express';
import { triggerWeeklyUpdate } from '../services/cronService';

export const manualUpdate = async (req: Request, res: Response) => {
    try {
        console.log('Manual update triggered via API');
        const result = await triggerWeeklyUpdate();
        res.json({
            success: true,
            message: `Updated ${result.count} strategies`,
            count: result.count
        });
    } catch (error: any) {
        console.error('Error in manual update controller:', error);
        res.status(500).json({ error: error.message || 'Failed to trigger update' });
    }
};
