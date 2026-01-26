import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    // Validate API key configuration

    if (!process.env.WEATHER_API_KEY) {
      return NextResponse.json(
        { error: 'Weather API key not configured. Please add WEATHER_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    let weatherUrl = '';
    
    // Use coordinates if provided, otherwise use location name
    if (lat && lon) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    } else if (location) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    } else {
      return NextResponse.json(
        { error: 'Location or coordinates required' },
        { status: 400 }
      );
    }

    console.log('Making weather API request to:', weatherUrl.replace(process.env.WEATHER_API_KEY, 'API_KEY_HIDDEN'));

    const weatherResponse = await fetch(weatherUrl);
    
    if (!weatherResponse.ok) {
      const errorText = await weatherResponse.text();
      console.error('Weather API Error:', {
        status: weatherResponse.status,
        statusText: weatherResponse.statusText,
        response: errorText
      });

      if (weatherResponse.status === 401) {
        return NextResponse.json(
          { 
            error: 'Invalid API key. Please check your OpenWeatherMap API key.',
            details: 'Make sure your API key is correct and activated (can take up to 2 hours after signup)',
            status: 401
          },
          { status: 401 }
        );
      } else if (weatherResponse.status === 404) {
        return NextResponse.json(
          { error: 'Location not found. Please check the location name and try again.' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { 
          error: `Weather API error: ${weatherResponse.status} ${weatherResponse.statusText}`,
          details: errorText
        },
        { status: weatherResponse.status }
      );
    }

    const weatherData = await weatherResponse.json();

    // Get 5-day forecast
    let forecastUrl = '';
    if (lat && lon) {
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    } else if (location) {
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    }

    let forecastData = null;
    
    if (forecastUrl) {
      const forecastResponse = await fetch(forecastUrl);
      if (forecastResponse.ok) {
        forecastData = await forecastResponse.json();
      } else {
        console.warn('Forecast API failed, continuing without forecast data');
      }
    }

    // Format the response
    const formattedWeather = {
      location: {
        name: weatherData.name,
        country: weatherData.sys.country,
        coordinates: {
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon
        }
      },
      current: {
        temperature: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        visibility: weatherData.visibility ? Math.round(weatherData.visibility / 1000) : null,
        uvIndex: null, // OpenWeatherMap doesn't provide UV in basic plan
        windSpeed: weatherData.wind.speed,
        windDirection: weatherData.wind.deg,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        cloudiness: weatherData.clouds.all,
        sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()
      },
      forecast: forecastData ? forecastData.list.slice(0, 8).map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleString(),
        temperature: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed
      })) : [],
      agriculturalInsights: generateAgriculturalInsights(weatherData),
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(formattedWeather);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

function generateAgriculturalInsights(weatherData: any) {
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const description = weatherData.weather[0].main.toLowerCase();
  
  const insights = [];

  // Temperature insights
  if (temp > 35) {
    insights.push({
      type: 'warning',
      title: 'High Temperature Alert',
      message: 'Extreme heat may stress crops. Ensure adequate irrigation and consider shade protection for sensitive plants.',
      icon: '🌡️'
    });
  } else if (temp < 5) {
    insights.push({
      type: 'warning',
      title: 'Cold Weather Alert',
      message: 'Low temperatures may damage crops. Consider frost protection measures for sensitive plants.',
      icon: '❄️'
    });
  } else if (temp >= 20 && temp <= 30) {
    insights.push({
      type: 'positive',
      title: 'Optimal Temperature',
      message: 'Current temperature is ideal for most crop growth and outdoor farming activities.',
      icon: '🌱'
    });
  }

  // Humidity insights
  if (humidity > 80) {
    insights.push({
      type: 'warning',
      title: 'High Humidity',
      message: 'High humidity increases risk of fungal diseases. Ensure good air circulation and consider fungicide application.',
      icon: '💧'
    });
  } else if (humidity < 30) {
    insights.push({
      type: 'info',
      title: 'Low Humidity',
      message: 'Low humidity may increase water stress. Monitor soil moisture and increase irrigation frequency.',
      icon: '🏜️'
    });
  }

  // Weather condition insights
  if (description.includes('rain')) {
    insights.push({
      type: 'info',
      title: 'Rainfall Detected',
      message: 'Good for soil moisture but avoid heavy machinery use. Check for waterlogging in low-lying areas.',
      icon: '🌧️'
    });
  } else if (description.includes('clear') || description.includes('sun')) {
    insights.push({
      type: 'positive',
      title: 'Clear Weather',
      message: 'Excellent conditions for harvesting, spraying, and other field operations.',
      icon: '☀️'
    });
  }

  // Wind insights
  if (windSpeed > 10) {
    insights.push({
      type: 'warning',
      title: 'Strong Winds',
      message: 'High winds may damage crops and make spraying ineffective. Postpone aerial applications.',
      icon: '💨'
    });
  }

  // General farming advice
  insights.push({
    type: 'info',
    title: 'Market Impact',
    message: 'Weather conditions directly affect crop quality and market prices. Plan harvesting and storage accordingly.',
    icon: '📈'
  });

  return insights;
}