'use client';

import { useState } from 'react';

export default function TestWeatherPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/weather?location=Mumbai');
      const data = await response.json();
      setResult({ status: response.status, data });
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Weather API Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Weather API</h2>
          <button
            onClick={testWeather}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Weather API (Mumbai)'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Result:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Setup Instructions:</h3>
          <ol className="list-decimal list-inside text-yellow-700 space-y-1">
            <li>Get a free API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="underline">OpenWeatherMap</a></li>
            <li>Add <code className="bg-yellow-100 px-1 rounded">WEATHER_API_KEY=your_api_key_here</code> to your .env.local file</li>
            <li>Restart the development server</li>
            <li>Test the API using the button above</li>
          </ol>
        </div>
      </div>
    </div>
  );
}