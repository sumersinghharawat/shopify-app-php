<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\SettingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return "Hello API";
});

// Events
Route::get('/view-event',[EventController::class,'showEvent']);
Route::get('/view-event/{id}',[EventController::class,'showEvent']);
Route::post('/add-event',[EventController::class,'storeEvent']);

// Install theme

Route::get('/install-app',[SettingController::class,'configureTheme'])->middleware('shopify.auth');
