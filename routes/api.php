<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/status', function(){
    return ["status"=>"running"];
});

//todo routes
Route::post('/todo',[TodoController::class,'storeApi']);
Route::put('/todo/{todo}',[TodoController::class,'updateApi']);
Route::put('/todo/toggle/{todo}',[TodoController::class,'todoToggleApi']);
Route::delete('/todo/{todo}',[TodoController::class,'destroyApi']);
