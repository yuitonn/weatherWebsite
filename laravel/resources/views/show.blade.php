<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Myデータ') }}
        </h2>
    </x-slot>

    <div id="app-root">
        <div id="my-display" 
            data-city="{{ implode(',', $cities) }}" 
            data-travel-date="{{ implode(',', $travelDates) }}">
        </div>
    </div>

</x-app-layout>