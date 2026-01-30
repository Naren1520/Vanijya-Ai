import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    console.log('Testing Gemini API with key:', apiKey.substring(0, 10) + '...');

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try different model names
    const models = ['gemini-pro', 'gemini-2.5-flash', 'gemini-1.5-flash-latest'];
    
    for (const modelName of models) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent('Say hello');
        const response = await result.response;
        const text = response.text();
        
        console.log(`Model ${modelName} works! Response:`, text);
        
        return NextResponse.json({
          success: true,
          model: modelName,
          response: text,
          apiKey: apiKey.substring(0, 10) + '...'
        });
        
      } catch (modelError) {
        console.log(`Model ${modelName} failed:`, modelError);
        continue;
      }
    }
    
    return NextResponse.json({
      error: 'All models failed',
      apiKey: apiKey.substring(0, 10) + '...'
    }, { status: 500 });
    
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}