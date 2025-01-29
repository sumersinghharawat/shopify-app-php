<?php

use App\Http\Controllers\MargProductsController;
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

Route::get('marg/products', [ MargProductsController::class, 'getProduct' ])->name('api.marg.products');

Route::post('sync-product', [ MargProductsController::class, 'syncProduct' ])->name('api.syncproduct');

Route::post('unsync-product', [ MargProductsController::class, 'unsyncProduct' ])->name('api.unsyncproduct');

