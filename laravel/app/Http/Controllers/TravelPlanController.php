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

        return response()->json(['message' => 'Travel plan created successfully', 'redirect' => route('show')], 201);
    }

    public function show()
    {
        $userId = auth()->id(); // 現在のユーザーのIDを取得

        // ユーザーに関連する旅行プランを取得
        $travelPlans = TravelPlan::where('user_id', $userId)->get();

        // 各プランのcity、travel_date、idを取得
        $cities = $travelPlans->pluck('city')->toArray();
        $travelDates = $travelPlans->pluck('travel_date')->toArray();
        $travelPlansIds = $travelPlans->pluck('id')->toArray(); // IDを取得

        return view('show', compact('cities', 'travelDates', 'travelPlansIds')); // ビューにデータを渡す
    }

    public function destroy($id)
    {
        $travelPlan = TravelPlan::findOrFail($id);
        
        // ユーザーの権限を確認（オプション）
        if ($travelPlan->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $travelPlan->delete();

        return response()->json(['message' => 'Travel plan deleted successfully'], 200);
    }
}
