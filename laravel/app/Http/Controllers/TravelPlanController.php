<?php

namespace App\Http\Controllers;
use App\Models\TravelPlan;
use Illuminate\Http\Request;

class TravelPlanController extends Controller
{
    public function store(Request $request)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'city' => 'required|string|max:255',
            'travel_date' => 'required|date',
            // 他のバリデーションルール
        ]);

        $userId = auth()->id();

        $travelPlan = TravelPlan::create([
            'city' => $request->city,
            'travel_date' => $request->travel_date,
            'user_id' => $userId,
        ]);

        return response()->json($travelPlan, 201);
    }

    public function show()
    {
        $userId = auth()->id(); // 現在のユーザーのIDを取得

        // ユーザーに関連する旅行プランを取得
        $travelPlans = TravelPlan::where('user_id', $userId)->get();

        // 旅行プランが存在する場合、各プランのcityとtravel_dateを取得し、存在しない場合は空の配列を設定
        $cities = $travelPlans->pluck('city')->toArray();
        $travelDates = $travelPlans->pluck('travel_date')->toArray();

        return view('show', compact('cities', 'travelDates')); // ビューにデータを渡す
    }
}
