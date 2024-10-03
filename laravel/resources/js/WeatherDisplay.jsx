import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'; // styled-componentsをインポート

const BgDiv = styled.div`
    background-image: url('/img/background.png');
    background-size: cover; 
    background-position: center; 
    height: 400px; 
    width: 100%;
    display: flex; 
    flex-direction: column;
    align-items: center;
`;


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

    if (loading) return <div className=' bg-white'>Loading...</div>;
    if (error) return <div className=' bg-white'>Error: {error}</div>;

    return (
        <>
            <BgDiv className='justify-center mr-24'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={city}
                        onChange={handleCityChange}
                        placeholder="行き先場所"
                        required
                        className='px-24 py-3'
                    />
                    <input
                        type="date"
                        value={travelDate}
                        onChange={handleDateChange}
                        min={minDate}
                        max={maxDateStr}
                        required
                        className='py-3 px-4'
                    />
                    <button 
                        type="submit" 
                        className='ml-4 border px-3 py-2 rounded bg-white'
                    >{weatherData ? '追加' : '表示'}</button>
                </form>
            </BgDiv>
            {weatherData && (
                <div className='text-center bg-white pt-8 px-8'>
                    <p>お出かけ場所: {city}</p>
                    <p>日にち: {travelDate}</p>
                    <div className='mt-2 mb-6'>
                        <input 
                            type="checkbox" 
                            checked={isSaveChecked} 
                            onChange={handleCheckboxChange} 
                        />
                        <label>Myデータに保存する</label>
                    </div>
                    <ul className='bg-white'>
                        {weatherData.map((forecast, index) => (
                            <li key={index} className="border border-gray-300 p-4 mb-2 rounded my-4 text-center bg-white">
                                <p className='pb-2'>日にち: {formatDate(forecast.date)}</p>
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
        </>
        
    );
};

export default WeatherDisplay;