'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Gauge, 
  MapPin, 
  Search, 
  Loader2,
  AlertTriangle,
  Info,
  CheckCircle,
  Sunrise,
  Sunset,
  Navigation,
  Map
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface WeatherData {
  location: {
    name: string;
    country: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    visibility: number | null;
    windSpeed: number;
    windDirection: number;
    description: string;
    icon: string;
    cloudiness: number;
    sunrise: string;
    sunset: string;
  };
  forecast: Array<{
    time: string;
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  }>;
  agriculturalInsights: Array<{
    type: 'warning' | 'info' | 'positive';
    title: string;
    message: string;
    icon: string;
  }>;
  lastUpdated: string;
}

export default function WeatherPage() {
  const { isAuthenticated } = useAuth();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    // Try to get user's current location on component mount
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationPermission('granted');
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationPermission('denied');
        setLoading(false);
        // Default to a major Indian city if location access is denied
        fetchWeatherByLocation('Mumbai, India');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`API Key Issue: ${data.error}\n\n${data.details || 'Please check your OpenWeatherMap API key configuration.'}`);
        }
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (location: string) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`API Key Issue: ${data.error}\n\n${data.details || 'Please check your OpenWeatherMap API key configuration.'}`);
        }
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      fetchWeatherByLocation(searchLocation.trim());
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      '01d': <Sun className="w-8 h-8 text-yellow-500" />,
      '01n': <Sun className="w-8 h-8 text-yellow-300" />,
      '02d': <Cloud className="w-8 h-8 text-gray-500" />,
      '02n': <Cloud className="w-8 h-8 text-gray-400" />,
      '03d': <Cloud className="w-8 h-8 text-gray-600" />,
      '03n': <Cloud className="w-8 h-8 text-gray-500" />,
      '04d': <Cloud className="w-8 h-8 text-gray-700" />,
      '04n': <Cloud className="w-8 h-8 text-gray-600" />,
      '09d': <CloudRain className="w-8 h-8 text-blue-500" />,
      '09n': <CloudRain className="w-8 h-8 text-blue-400" />,
      '10d': <CloudRain className="w-8 h-8 text-blue-600" />,
      '10n': <CloudRain className="w-8 h-8 text-blue-500" />,
      '11d': <CloudRain className="w-8 h-8 text-purple-600" />,
      '11n': <CloudRain className="w-8 h-8 text-purple-500" />,
    };
    
    return iconMap[iconCode] || <Cloud className="w-8 h-8 text-gray-500" />;
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'positive':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Cloud className="w-16 h-16 text-earth-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-earth-800 mb-4">
            Weather Insights
          </h1>
          <p className="text-earth-600 mb-8">
            Sign in to access real-time weather data and agricultural insights for better farming decisions
          </p>
          <a
            href="/auth/signin"
            className="gradient-saffron text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 inline-block"
          >
            Sign In to Continue
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            Weather Insights
          </h1>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            Real-time weather data and agricultural insights to help you make informed farming decisions
          </p>
        </motion.div>

        {/* Search and Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-500" />
                <input
                  type="text"
                  placeholder="Search for a city or location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="gradient-saffron text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
              </button>
            </form>

            {/* Current Location Button */}
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="flex items-center space-x-2 glass text-earth-700 px-6 py-3 rounded-lg font-medium hover:bg-white/40 transition-all duration-300 disabled:opacity-50"
            >
              <Navigation className="w-5 h-5" />
              <span>Current Location</span>
            </button>
          </div>

          {locationPermission === 'denied' && (
            <div className="mt-4 p-3 bg-orange-100 border border-orange-300 rounded-lg">
              <p className="text-orange-700 text-sm">
                Location access denied. You can still search for weather by entering a city name above.
              </p>
            </div>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-earth-600">Fetching weather data...</p>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && !loading && (
          <div className="space-y-8">
            {/* Current Weather */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-earth-800 flex items-center space-x-2">
                    <MapPin className="w-6 h-6" />
                    <span>{weatherData.location.name}, {weatherData.location.country}</span>
                  </h2>
                  <p className="text-earth-600 capitalize">{weatherData.current.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-earth-500">Last updated</p>
                  <p className="text-sm text-earth-600">
                    {new Date(weatherData.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weather Data - Left Side */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Temperature */}
                    <div className="bg-white/40 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        {getWeatherIcon(weatherData.current.icon)}
                      </div>
                      <div className="text-3xl font-bold text-earth-800 mb-1">
                        {weatherData.current.temperature}°C
                      </div>
                      <div className="text-sm text-earth-600">
                        Feels like {weatherData.current.feelsLike}°C
                      </div>
                    </div>

                    {/* Humidity */}
                    <div className="bg-white/40 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-earth-800">Humidity</span>
                      </div>
                      <div className="text-2xl font-bold text-earth-800">
                        {weatherData.current.humidity}%
                      </div>
                    </div>

                    {/* Wind */}
                    <div className="bg-white/40 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Wind className="w-5 h-5 text-gray-500" />
                        <span className="font-semibold text-earth-800">Wind</span>
                      </div>
                      <div className="text-2xl font-bold text-earth-800">
                        {weatherData.current.windSpeed} m/s
                      </div>
                      <div className="text-sm text-earth-600">
                        {weatherData.current.windDirection}°
                      </div>
                    </div>

                    {/* Pressure */}
                    <div className="bg-white/40 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Gauge className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold text-earth-800">Pressure</span>
                      </div>
                      <div className="text-2xl font-bold text-earth-800">
                        {weatherData.current.pressure} hPa
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Sunrise className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                      <div className="text-sm text-earth-600">Sunrise</div>
                      <div className="font-semibold text-earth-800">{weatherData.current.sunrise}</div>
                    </div>
                    <div className="text-center">
                      <Sunset className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                      <div className="text-sm text-earth-600">Sunset</div>
                      <div className="font-semibold text-earth-800">{weatherData.current.sunset}</div>
                    </div>
                    <div className="text-center">
                      <Eye className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <div className="text-sm text-earth-600">Visibility</div>
                      <div className="font-semibold text-earth-800">
                        {weatherData.current.visibility ? `${weatherData.current.visibility} km` : 'N/A'}
                      </div>
                    </div>
                    <div className="text-center">
                      <Cloud className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <div className="text-sm text-earth-600">Cloudiness</div>
                      <div className="font-semibold text-earth-800">{weatherData.current.cloudiness}%</div>
                    </div>
                  </div>
                </div>

                {/* Location Map - Right Side */}
                <div className="lg:col-span-1">
                  <div className="bg-white/40 rounded-lg p-4 h-full">
                    <div className="flex items-center space-x-2 mb-4">
                      <Map className="w-5 h-5 text-earth-600" />
                      <span className="font-semibold text-earth-800">Location</span>
                    </div>
                    <div className="relative h-64 lg:h-full min-h-[200px] rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${weatherData.location.coordinates.lon - 0.005},${weatherData.location.coordinates.lat - 0.005},${weatherData.location.coordinates.lon + 0.005},${weatherData.location.coordinates.lat + 0.005}&layer=mapnik&marker=${weatherData.location.coordinates.lat},${weatherData.location.coordinates.lon}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        title={`Map showing ${weatherData.location.name}`}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="text-sm text-earth-600">Coordinates</div>
                      <div className="text-xs font-mono text-earth-700">
                        {weatherData.location.coordinates.lat.toFixed(4)}, {weatherData.location.coordinates.lon.toFixed(4)}
                      </div>
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${weatherData.location.coordinates.lat}&mlon=${weatherData.location.coordinates.lon}&zoom=15`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs text-saffron-600 hover:text-saffron-700 underline"
                      >
                        View on OpenStreetMap
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Agricultural Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-earth-800 mb-4">Agricultural Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weatherData.agriculturalInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getInsightBgColor(insight.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getInsightIcon(insight.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-earth-800">{insight.title}</h4>
                          <span className="text-lg">{insight.icon}</span>
                        </div>
                        <p className="text-earth-700 text-sm">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Forecast */}
            {weatherData.forecast.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-earth-800 mb-4">8-Hour Forecast</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {weatherData.forecast.map((item, index) => (
                    <div key={index} className="bg-white/40 rounded-lg p-3 text-center">
                      <div className="text-xs text-earth-600 mb-2">
                        {new Date(item.time).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(item.icon)}
                      </div>
                      <div className="font-bold text-earth-800 mb-1">
                        {item.temperature}°C
                      </div>
                      <div className="text-xs text-earth-600 capitalize">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}