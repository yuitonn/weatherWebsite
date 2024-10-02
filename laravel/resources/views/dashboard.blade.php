<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('3日間の天気を調べる') }}
        </h2>
    </x-slot>

    <div id="root">
        <!-- WeatherDisplayコンポーネントを表示するためのDOM要素 -->
        <div id="weather-display"></div>
    </div>
</x-app-layout>