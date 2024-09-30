<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TravelPlanController;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/travel-plans/store', [TravelPlanController::class, 'store']);
Route::get('/travel-plans/{id}', [TravelPlanController::class, 'show']);
Route::get('/weather/{city}', [ApiController::class, 'getWeather'])->name('weather');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
