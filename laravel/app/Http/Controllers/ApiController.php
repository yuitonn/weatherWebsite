<?php

namespace App\Http\Controllers;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getWeather($city)
    {
        try {
            $apiKey = env('OPENWEATHERMAP_API_KEY');
            $client = new \GuzzleHttp\Client();
            
            // OpenWeatherMap APIへのリクエスト
            $response = $client->get("https://api.openweathermap.org/data/2.5/weather", [
                'query' => [
                    'q' => $city,
                    'appid' => $apiKey,
                    'units' => 'metric', // 摂氏温度
                ]
            ]);
    
            // レスポンスをデコード
            $weatherData = json_decode($response->getBody(), true);
    
            return response()->json([
                'city' => $weatherData['name'],
                'temperature' => $weatherData['main']['temp'],
                'weather' => $weatherData['weather'][0]['description'],
                'wind_speed' => $weatherData['wind']['speed'],
                'alerts' => $weatherData['alerts'] ?? [], // アラート情報（存在する場合）
            ]);
        } catch (\Exception $e) {
            // エラーが発生した場合にエラーログに出力し、クライアントに500エラーを返す
            \Log::error('Error fetching weather data: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to fetch weather data'], 500);
        }
    }
}
