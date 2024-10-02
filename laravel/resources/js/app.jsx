import './bootstrap.js'; // Laravelの初期化スクリプト
import Alpine from 'alpinejs'; // Alpine.jsのインポート
import React from 'react';
import ReactDOM from 'react-dom/client';
import WeatherDisplay from './WeatherDisplay.jsx'; // WeatherDisplayコンポーネントのパス
import MyDisplay from './MyDisplay.jsx';

// Alpine.jsの初期化
window.Alpine = Alpine;
Alpine.start();

// WeatherDisplayコンポーネントをレンダリング
const weatherDisplayElement = document.getElementById('weather-display');
if (weatherDisplayElement) {
    ReactDOM.createRoot(weatherDisplayElement).render(
        <WeatherDisplay />
    );
}

// MyDisplayコンポーネントをレンダリング
const myDisplayElement = document.getElementById('my-display');
if (myDisplayElement) {
    const userCities = myDisplayElement.dataset.city.split(','); // カンマ区切りで分割
    const userTravelDates = myDisplayElement.dataset.travelDate.split(','); // カンマ区切りで分割

    console.log('Cities:', userCities);
    console.log('Travel Dates:', userTravelDates);

    ReactDOM.createRoot(myDisplayElement).render(
        <MyDisplay 
            userCities={userCities} 
            userTravelDates={userTravelDates} 
        />
    );
}