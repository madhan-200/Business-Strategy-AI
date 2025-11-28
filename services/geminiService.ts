import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BusinessProfile, Strategy } from "../types";

// NOTE: In a real production app, this key should be proxied through a backend.
// For this demo, we assume process.env.API_KEY is available or injected.
const apiKey = process.env.API_KEY || '';

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
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
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
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: strategySchema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text);
    
    return {
      ...data,
      id: crypto.randomUUID(),
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error generating strategy:", error);
    throw error;
  }
};