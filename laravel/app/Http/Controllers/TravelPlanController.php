<?php

namespace App\Http\Controllers;
use App\Models\TravelPlan;
use Illuminate\Http\Request;

class TravelPlanController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'destination' => 'required|string|max:255',
            'travel_date' => 'required|date',
            // 他のバリデーションルール
        ]);

        $travelPlan = TravelPlan::create([
            'destination' => $request->destination,
            'travel_date' => $request->travel_date,
            'user_id' => auth()->id(), 
        ]);

        return response()->json($travelPlan, 201);
    }

    public function show($id)
    {
        $travelPlan = TravelPlan::findOrFail($id);
        return response()->json($travelPlan);
    }
}
