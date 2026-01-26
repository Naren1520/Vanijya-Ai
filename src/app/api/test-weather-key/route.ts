import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.WEATHER_API_KEY) {
      return NextResponse.json({
        status: 'error',
        message: 'WEATHER_API_KEY environment variable not found',
        solution: 'Add WEATHER_API_KEY to your .env.local file'
      });
    }

    // Test the API key with a simple request to London
    const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    
    console.log('Testing weather API key...');
    const response = await fetch(testUrl);
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        status: 'success',
        message: 'Weather API key is working correctly!',
        testLocation: `${data.name}, ${data.sys.country}`,
        temperature: `${Math.round(data.main.temp)}°C`,
        description: data.weather[0].description
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        status: 'error',
        message: `API key test failed: ${response.status} ${response.statusText}`,
        details: errorText,
        solutions: [
          'Check if your API key is correct',
          'Wait up to 2 hours for new API keys to activate',
          'Verify your OpenWeatherMap account is active',
          'Make sure you copied the entire API key'
        ]
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to test weather API key',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}