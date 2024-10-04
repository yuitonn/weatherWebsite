import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyDisplay = ({ userCities, userTravelDates, userTravelPlanIds }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
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
                setLoading(false);
            }
        };

        if (userCities.length > 0 && userTravelDates.length > 0) {
            fetchWeatherData();
        }
    }, [userCities, userTravelDates]);

    const handleDelete = async (index) => {
        const travelPlanId = userTravelPlanIds[index]; // IDを取得
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`/travel-plans/${travelPlanId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                alert('旅行プランが削除されました。');
                setWeatherData((prevData) => {
                    const newData = [...prevData];
                    newData.splice(index, 1);
                    return newData;
                });
            }
        } catch (err) {
            console.error('削除に失敗しました:', err);
            alert('削除に失敗しました。');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='px-8 bg-white'>
            {weatherData.map((data, index) => (
                <div key={index} className='bg-white'>
                    <h3>お出かけ場所: {userCities[index]}</h3>
                    <p className='mb-4'>日にち: {userTravelDates[index]}</p>
                    <ul>
                        {data.map((forecast, forecastIndex) => (
                            <li key={forecastIndex} className="border border-gray-300 p-2 mb-2 rounded">
                                <p>日にち: {forecast.date}</p>
                                <p>最高気温: {forecast.max_temperature} °C</p>
                                <p>最低気温: {forecast.min_temperature} °C</p>
                                <p>天気: {forecast.weather}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleDelete(index)} className="ml-1 bg-red-500 text-white px-2 rounded mb-12">
                        削除
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MyDisplay;