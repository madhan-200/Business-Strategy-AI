import { GoogleGenAI } from "@google/genai";
import path from 'path';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const testGemini = async () => {
    console.log('🤖 Testing Gemini API Key...');

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('❌ GEMINI_API_KEY is missing in .env');
        return;
    }

    console.log('🔑 Key found:', apiKey.substring(0, 10) + '...');

    try {
        const ai = new GoogleGenAI({ apiKey });

        console.log('📤 Sending request to Gemini...');

        // Using the exact same method as aiService.ts
        // Casting to any to avoid potential TS issues in this standalone script
        const response = await (ai as any).models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Say 'Hello, StratAI is working!' if you can hear me.",
            config: {
                responseMimeType: "text/plain",
            }
        });

        console.log('📥 Response received!');
        console.log('💬 AI says:', response?.text || 'No text response');
        console.log('✅ Gemini API Key is WORKING correctly!');

    } catch (error: any) {
        console.error('❌ Gemini API Test Failed:', error.message || error);
        console.error('Full error:', JSON.stringify(error, null, 2));
    }
};

testGemini();
