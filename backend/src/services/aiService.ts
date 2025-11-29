import dotenv from 'dotenv';
import path from 'path';
// Load .env from the backend root directory
const envPath = path.resolve(__dirname, '../../.env');
console.log('📂 Loading .env from:', envPath);
const result = dotenv.config({ path: envPath });
if (result.error) {
    console.error('❌ Error loading .env:', result.error);
} else {
    console.log('✅ .env loaded successfully');
}

import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BusinessProfile, Strategy } from "../types";
import crypto from 'crypto';

const apiKey = process.env.GEMINI_API_KEY || '';
console.log('🔑 Gemini API Key loaded:', apiKey ? `${apiKey.substring(0, 10)}...` : 'MISSING');
console.log('🔍 All env vars:', Object.keys(process.env).filter(k => k.includes('GEMINI')));

const ai = new GoogleGenAI({ apiKey });

const strategySchema: Schema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "Executive summary of the strategy" },
        growthScore: { type: Type.INTEGER, description: "A calculated growth potential score from 0-100" },
        targetAudience: {
            type: Type.OBJECT,
            properties: {
                demographics: { type: Type.ARRAY, items: { type: Type.STRING } },
                psychographics: { type: Type.ARRAY, items: { type: Type.STRING } },
                painPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        marketingChannels: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    channel: { type: Type.STRING },
                    rationale: { type: Type.STRING },
                    roi: { type: Type.STRING }
                }
            }
        },
        salesFunnel: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    stage: { type: Type.STRING, description: "e.g., Awareness, Consideration" },
                    tactic: { type: Type.STRING },
                    metric: { type: Type.STRING }
                }
            }
        },
        contentCalendar: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    platform: { type: Type.STRING },
                    type: { type: Type.STRING },
                    description: { type: Type.STRING },
                    status: { type: Type.STRING, description: "Always set to 'pending'" }
                }
            }
        },
        pricingStrategy: {
            type: Type.OBJECT,
            properties: {
                model: { type: Type.STRING },
                recommendation: { type: Type.STRING }
            }
        },
        competitors: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    strength: { type: Type.STRING },
                    weakness: { type: Type.STRING }
                }
            }
        },
        kpis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    metric: { type: Type.STRING },
                    target: { type: Type.STRING }
                }
            }
        }
    },
    required: ["summary", "growthScore", "marketingChannels", "contentCalendar", "salesFunnel"]
};

export const generateStrategyAI = async (business: BusinessProfile): Promise<Strategy> => {
    if (!apiKey) {
        throw new Error("API Key is missing. Please set GEMINI_API_KEY in .env");
    }

    const prompt = `
    Act as a Chief Strategy Officer. Analyze the following business:
    Name: ${business.name}
    Industry: ${business.industry}
    Niche: ${business.niche}
    Target Audience: ${business.audience}
    Goals: ${business.goals}
    Challenges: ${business.challenges}

    Generate a comprehensive strategic plan. 
    Create a 7-day sample content calendar.
    Estimate a 'growthScore' (0-100) based on market viability.
    Provide actionable insights for sales funnel and marketing channels.
  `;

    try {
        console.log('🤖 Calling Gemini API...');
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: strategySchema,
                temperature: 0.7,
            }
        });

        const text = response?.text;
        console.log('📥 Raw response length:', text?.length || 0);

        if (!text) {
            throw new Error("No response from AI");
        }

        // Validate response is not empty
        if (text.trim().length === 0) {
            throw new Error("Empty response from AI");
        }

        // Try to parse JSON with better error handling
        let data;
        try {
            // Clean the response text (remove any potential BOM or invisible characters)
            const cleanedText = text.trim().replace(/^\uFEFF/, '');
            data = JSON.parse(cleanedText);
            console.log('✅ JSON parsed successfully');
        } catch (parseError: any) {
            console.error('❌ JSON Parse Error:', parseError.message);
            console.error('📄 Problematic text (first 500 chars):', text.substring(0, 500));
            console.error('📄 Problematic text (last 500 chars):', text.substring(Math.max(0, text.length - 500)));

            // Try to extract JSON from the response if it's wrapped in other text
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                console.log('🔧 Attempting to extract JSON from wrapped response...');
                try {
                    data = JSON.parse(jsonMatch[0]);
                    console.log('✅ Extracted and parsed JSON successfully');
                } catch (extractError) {
                    throw new Error(`Failed to parse AI response as JSON: ${parseError.message}`);
                }
            } else {
                throw new Error(`Failed to parse AI response as JSON: ${parseError.message}`);
            }
        }

        // Validate required fields
        if (!data.summary || !data.growthScore || !data.marketingChannels || !data.contentCalendar) {
            console.error('❌ Missing required fields in AI response:', {
                hasSummary: !!data.summary,
                hasGrowthScore: !!data.growthScore,
                hasMarketingChannels: !!data.marketingChannels,
                hasContentCalendar: !!data.contentCalendar
            });
            throw new Error("AI response missing required fields");
        }

        console.log('✅ Strategy generated successfully');
        return {
            ...data,
            id: crypto.randomUUID(),
            generatedAt: new Date().toISOString()
        };
    } catch (error: any) {
        console.error("❌ Error generating strategy:", error);

        // Provide more helpful error messages
        if (error.message?.includes('API key')) {
            throw new Error("Invalid or missing API key. Please check your GEMINI_API_KEY environment variable.");
        } else if (error.message?.includes('parse')) {
            throw new Error("Failed to process AI response. The AI returned malformed data. Please try again.");
        } else if (error.message?.includes('quota')) {
            throw new Error("API quota exceeded. Please try again later.");
        }

        throw error;
    }
};
