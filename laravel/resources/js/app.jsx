import './bootstrap.js'; // Laravelの初期化スクリプト

import Alpine from 'alpinejs'; // Alpine.jsのインポート
window.Alpine = Alpine; // Alpine.jsをウィンドウオブジェクトに登録
Alpine.start(); // Alpine.jsの初期化

import React from 'react';
import ReactDOM from 'react-dom/client';
import WeatherDisplay from './WeatherDisplay.jsx'; // WeatherDisplayコンポーネントのパス

const city = document.getElementById('weather-display')?.getAttribute('data-city');

if (city) {
    ReactDOM.createRoot(document.getElementById('weather-display')).render(<WeatherDisplay city={city} />);
}
