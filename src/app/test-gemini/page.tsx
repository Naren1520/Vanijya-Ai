'use client';

import { useState } from 'react';

export default function TestGeminiPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketInput, setMarketInput] = useState('Azadpur Mandi');
  const [locationInput, setLocationInput] = useState('Delhi, India');

  const testGeminiAPI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing Enhanced Gemini AI for:', marketInput);
      
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          market: marketInput,
          location: locationInput
        }),
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
      }

      console.log('Received enhanced AI data:', data);
      setResult(data);
    } catch (err) {
      console.error('Test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-white to-earth-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-earth-800">Enhanced AI Market Analysis Test</h1>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Test AI Market Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">Market Name</label>
              <input
                type="text"
                value={marketInput}
                onChange={(e) => setMarketInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500"
                placeholder="Enter market name..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">Location</label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500"
                placeholder="Enter location..."
              />
            </div>
          </div>
          
          <button
            onClick={testGeminiAPI}
            disabled={loading}
            className="px-6 py-3 gradient-saffron text-white rounded-lg disabled:opacity-50 font-semibold"
          >
            {loading ? 'Analyzing with AI...' : 'Generate AI Market Analysis'}
          </button>
        </div>

        {loading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
            <div className="flex items-center">
              <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mr-3"></div>
              AI is analyzing market conditions and generating comprehensive insights...
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <strong>AI Analysis Failed:</strong> {error}
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Market Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-earth-800">
                AI Analysis for {result.marketName}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-earth-700 mb-2">Market Info</h3>
                  <p><strong>Market:</strong> {result.marketName}</p>
                  <p><strong>Location:</strong> {result.location}</p>
                  <p><strong>Analysis Time:</strong> {new Date(result.lastUpdated).toLocaleString()}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-earth-700 mb-2">Data Summary</h3>
                  <p><strong>Commodities:</strong> {result.commodities?.length || 0}</p>
                  <p><strong>AI Insights:</strong> {result.aiInsights ? 'Available' : 'Missing'}</p>
                  <p><strong>Market Analysis:</strong> {result.marketAnalysis ? 'Available' : 'Missing'}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-earth-700 mb-2">Analysis Depth</h3>
                  <p><strong>Weather Impact:</strong> {result.weatherImpact ? 'Yes' : 'No'}</p>
                  <p><strong>Economic Factors:</strong> {result.economicFactors ? 'Yes' : 'No'}</p>
                  <p><strong>Nearby Markets:</strong> {result.nearbyMarkets?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* Market Analysis */}
            {result.marketAnalysis && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-earth-800">Market Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-earth-50 p-4 rounded-lg">
                    <h4 className="font-medium text-earth-800 mb-2">Overall Condition</h4>
                    <p className="text-sm text-earth-600">{result.marketAnalysis.overallCondition}</p>
                  </div>
                  <div className="bg-earth-50 p-4 rounded-lg">
                    <h4 className="font-medium text-earth-800 mb-2">Seasonal Factors</h4>
                    <p className="text-sm text-earth-600">{result.marketAnalysis.seasonalFactors}</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Insights */}
            {result.aiInsights && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-earth-800">AI Market Intelligence</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Market Sentiment</h4>
                    <p className="text-sm text-blue-700">{result.aiInsights.marketSentiment}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Strategic Advice</h4>
                    <p className="text-sm text-green-700">{result.aiInsights.strategicAdvice}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sample Commodities with AI Analysis */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-earth-800">Sample Commodities with AI Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.commodities?.slice(0, 6).map((commodity: any, index: number) => (
                  <div key={index} className="bg-saffron-50 p-4 rounded-lg">
                    <h4 className="font-medium text-earth-800 mb-2">{commodity.name}</h4>
                    <p className="text-saffron-600 font-bold mb-2">₹{commodity.currentPrice}/{commodity.unit}</p>
                    {commodity.priceAnalysis && (
                      <>
                        <p className="text-sm text-earth-600 mb-1">
                          <strong>Change:</strong> {commodity.priceAnalysis.changePercentage}
                        </p>
                        <p className="text-xs text-earth-500">
                          <strong>AI Reason:</strong> {commodity.priceAnalysis.changeReason?.substring(0, 80)}...
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Full JSON Response */}
            <details className="bg-gray-50 p-4 rounded-lg">
              <summary className="font-semibold cursor-pointer text-earth-700">View Complete AI Response JSON</summary>
              <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}