import React, { useState } from 'react';

const WeatherForm = ({ onSubmit, minDate, maxDateStr, weatherData }) => {
    const [formCity, setFormCity] = useState('');
    const [formTravelDate, setFormTravelDate] = useState('');

    const handleCityChange = (e) => setFormCity(e.target.value);
    const handleDateChange = (e) => setFormTravelDate(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Before submitting:', formCity, formTravelDate); // 修正した部分
        onSubmit(formCity, formTravelDate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={formCity}
                onChange={handleCityChange}
                placeholder="お出かけ場所"
                className='px-24 py-3'
            />
            <input
                type="date"
                value={formTravelDate}
                onChange={handleDateChange}
                min={minDate}
                max={maxDateStr}
                className='py-3 px-2'
            />
            <button type="submit" className='ml-4 border px-3 py-2 rounded bg-white'>{weatherData ? '追加' : '表示'}</button>
        </form>
    );
};

export default WeatherForm;