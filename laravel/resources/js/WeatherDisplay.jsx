import React, { useState } from 'react';
import axios from 'axios';

const WeatherDisplay = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [travelDate, setTravelDate] = useState('');
    const [isSaveChecked, setIsSaveChecked] = useState(false);

    const handleCityChange = (e) => setCity(e.target.value);
    const handleDateChange = (e) => setTravelDate(e.target.value);
    const handleCheckboxChange = (e) => setIsSaveChecked(e.target.checked);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!city || !travelDate) return;

        setLoading(true);
        try {
            const response = await axios.get(`/api/weather?city=${city}&travel_date=${travelDate}`);
            setWeatherData(response.data);
            setError(null);

            if (isSaveChecked) {
                await saveTravelPlan(city, travelDate);
            }
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const saveTravelPlan = async (city, travelDate) => {
        const token = localStorage.getItem('token'); // トークンを取得

        try {
            console.log('Saving travel plan:', { city, travel_date: travelDate }); // デバッグ用
            await axios.post('/api/travel-plans/store', {
                city: city,
                travel_date: travelDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('旅行プランが保存されました。');
        } catch (err) {
            console.error('Failed to save travel plan:', err);
            alert('旅行プランの保存に失敗しました。');
        }
    };

    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const maxDateStr = new Date(today.setDate(today.getDate() + 13)).toISOString().split('T')[0];

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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="行き先場所"
                    required
                />
                <input
                    type="date"
                    value={travelDate}
                    onChange={handleDateChange}
                    min={minDate}
                    max={maxDateStr}
                    required
                />
                <button type="submit">{weatherData ? '追加' : '表示'}</button>
            </form>
            {weatherData && (
                <div>
                    <p>行き先: {city}</p>
                    <p>お出かけ日: {travelDate}</p>
                    <input 
                        type="checkbox" 
                        checked={isSaveChecked} 
                        onChange={handleCheckboxChange} 
                    />
                    <label>場所と日にちを保存する</label>
                    <ul>
                        {weatherData.map((forecast, index) => (
                            <li key={index} className="border border-gray-300 p-2 mb-2 rounded">
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
            )}
        </div>
    );
};

export default WeatherDisplay;