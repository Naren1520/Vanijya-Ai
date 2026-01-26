'use client';

import { useState } from 'react';

export default function ApiTestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          market: 'Test Mandi',
          location: 'Test Location'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testGetApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/market-data?market=Test%20Mandi&location=Test%20Location');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
        
        <div className="space-y-4 mb-8">
          <button
            onClick={testApi}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing POST...' : 'Test POST API'}
          </button>
          
          <button
            onClick={testGetApi}
            disabled={loading}
            className="px-6 py-3 bg-green-500 text-white rounded-lg disabled:opacity-50 ml-4"
          >
            {loading ? 'Testing GET...' : 'Test GET API'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">API Response:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}