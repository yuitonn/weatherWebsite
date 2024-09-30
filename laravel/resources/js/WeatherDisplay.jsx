import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDisplay = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`/api/weather/${city}`);
                console.log(response.data);  // データを確認
                setWeatherData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weatherData) {
        return <div>No weather data available</div>;
    }

    return (
        <div>
            <h1>Weather in {weatherData.city}</h1>
            <p>Temperature: {weatherData.temperature} °C</p>
            <p>Weather: {weatherData.weather}</p>
            {/* wind プロパティが存在する場合のみ表示 */}
            {weatherData.wind && (
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            )}
        </div>
    );
};

export default WeatherDisplay;