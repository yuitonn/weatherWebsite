<?php

namespace App\Http\Controllers;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getFutureWeather(Request $request)
    {
        $city = $request->input('city');
        // 地名の形式を整える
        $formattedCity = trim($city) . ', Japan'; // 日本を明示的に追加
        $targetDate = $request->input('travel_date'); // ユーザーが入力した日付

        try {
            $apiKey = env('WEATHERAPI_KEY'); // WeatherAPIのAPIキーを.envファイルから取得
            $client = new Client();

            // WeatherAPIへのリクエスト
            $response = $client->get("http://api.weatherapi.com/v1/forecast.json", [
                'query' => [
                    'key' => $apiKey, // APIキー
                    'q' => $formattedCity, // フォーマットされた地名を使用
                    'days' => 14, // 14日間の予報を取得
                ]
            ]);

            // レスポンスをデコード
            $forecastData = json_decode($response->getBody(), true);

            // 特定の日付のデータをフィルタリング
            $filteredData = [];
            $filteredData = [];
            foreach ($forecastData['forecast']['forecastday'] as $day) {
                // 指定した日付が含まれているか確認
                if ($day['date'] >= $targetDate && $day['date'] < date('Y-m-d', strtotime($targetDate . ' + 3 days'))) {
                    $filteredData[] = [
                        'date' => $day['date'],
                        'max_temperature' => $day['day']['maxtemp_c'], // 最高気温
                        'min_temperature' => $day['day']['mintemp_c'], // 最低気温
                        'weather' => $day['day']['condition']['text'], // 天気の説明
                        'wind_speed' => $day['day']['maxwind_kph'], // 風速
                        'humidity' => $day['day']['avghumidity'], // 湿度を追加
                    ];
                }
            }
            return response()->json($filteredData);
        } catch (\Exception $e) {
            // エラーが発生した場合にエラーログに出力し、クライアントに500エラーを返す
            \Log::error('Error fetching forecast data: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to fetch forecast data'], 500);
        }
    }
}