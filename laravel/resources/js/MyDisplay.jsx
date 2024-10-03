import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyDisplay = ({ userCities, userTravelDates }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true); // ローディング開始
            const token = localStorage.getItem('token'); // トークンを取得

            try {
                const weatherResponses = await Promise.all(
                    userCities.map((city, index) =>
                        axios.get(`/api/weather?city=${city}&travel_date=${userTravelDates[index]}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                    )
                );

                const weatherDataArray = weatherResponses.map(response => response.data);
                setWeatherData(weatherDataArray);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // ローディング終了
            }
        };

        if (userCities.length > 0 && userTravelDates.length > 0) {
            fetchWeatherData();
        }
    }, [userCities, userTravelDates]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
    };

    const weatherEmojis = {
        "Sunny": "🌞",
        "Heavy rain": "🌧️",
        "Light rain": "🌦️",
        "Overcast clouds": "🌨️",
        "Moderate rain": "🌂",
        "Partly Cloudy": "🌤️",
        "Patchy rain nearby": "🌧️",
        "Cloudy": "🌥️",
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='px-8 bg-white'>
            {weatherData.map((data, index) => (
                <div key={index} className='bg-white'>
                    <h3>お出かけ場所: {userCities[index]}</h3>
                    <p className='mb-4'>日にち: {userTravelDates[index]}</p>
                    <ul className='pb-12'>
                        {data.map((forecast, forecastIndex) => (
                            <li key={forecastIndex} className="border border-gray-300 p-2 mb-2 rounded">
                                <p>日にち: {formatDate(forecast.date)}</p>
                                <p>最高気温: {forecast.max_temperature} °C</p>
                                <p>最低気温: {forecast.min_temperature} °C</p>
                                <p>天気: {forecast.weather} {weatherEmojis[forecast.weather]}</p>
                                <p>風速: {forecast.wind_speed} m/s</p>
                                <p>湿度: {forecast.humidity} %</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MyDisplay;

// 削除機能のボタン、フィルター