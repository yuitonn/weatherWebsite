<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div id="root">
        <!-- 東京の天気情報へのリンクを作成 -->
        <a href="{{ route('weather', ['city' => 'Tokyo']) }}">View Weather for Tokyo</a>

        <!-- WeatherDisplayコンポーネントを表示するためのDOM要素 -->
        <div id="weather-display" data-city="Tokyo"></div>
    </div>
</x-app-layout>