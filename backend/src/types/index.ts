export interface BusinessProfile {
    name: string;
    industry: string;
    niche: string;
    audience: string;
    goals: string;
    challenges: string;
}

export interface ContentItem {
    day: number;
    title: string;
    platform: 'LinkedIn' | 'Twitter' | 'Instagram' | 'Blog' | 'Email' | 'YouTube';
    type: 'Educational' | 'Promotional' | 'Engagement' | 'Case Study';
    description: string;
    status: 'pending' | 'completed';
}

export interface FunnelStage {
    stage: string;
    tactic: string;
    metric: string;
}

export interface Strategy {
    id: string;
    generatedAt: string;
    summary: string;
    growthScore: number;
    targetAudience: {
        demographics: string[];
        psychographics: string[];
        painPoints: string[];
    };
    marketingChannels: {
        channel: string;
        rationale: string;
        roi: string;
    }[];
    salesFunnel: FunnelStage[];
    contentCalendar: ContentItem[];
    pricingStrategy: {
        model: string;
        recommendation: string;
    };
    competitors: {
        name: string;
        strength: string;
        weakness: string;
    }[];
    kpis: {
        metric: string;
        target: string;
    }[];
}
