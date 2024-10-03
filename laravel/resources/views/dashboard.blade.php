<x-app-layout>
    <div class="flex flex-col h-screen"> <!-- フレックスコンテナ -->
        <x-slot name="header">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight mt-14">
                {{ __('3日間の天気を調べる') }}
            </h2>
        </x-slot>

        <div id="root">
            <!-- WeatherDisplayコンポーネントを表示するためのDOM要素 -->
            <div id="weather-display"></div>
        </div>

        <div class="bg-white flex-grow"> <!-- flex-growで残りのスペースを占有 -->
            <p></p>
        </div>
    </div>
</x-app-layout>