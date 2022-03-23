<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\EventFormController;
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

// Event Form
Route::post('/add-event-form',[EventFormController::class,'storeEventForm'])->middleware('shopify.auth:online');
Route::get('/view-event-form/{id}',[EventFormController::class,'showEventForm'])->middleware('shopify.auth:online');
Route::get('/view-event-form',[EventFormController::class,'showEventForm'])->middleware('shopify.auth:online');
Route::post('/edit-event-form/{id}',[EventFormController::class,'editEventForm'])->middleware('shopify.auth:online');
Route::delete('/delete-event-form/{id}',[EventFormController::class,'destroyEventForm'])->middleware('shopify.auth:online');


// Install theme

Route::get('/check-install-app',[SettingController::class,'checkConfigureTheme'])->middleware('shopify.auth:online');
Route::post('/install-app',[SettingController::class,'configureTheme'])->middleware('shopify.auth:online');
