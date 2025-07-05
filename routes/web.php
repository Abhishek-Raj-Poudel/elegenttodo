<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::post('todo',[TodoController::class,'store'] )->name('todo');
    Route::delete('todo',[TodoController::class,'destroy'] )->name('todo');
Route::get('/', [TodoController::class,'index'])->name('home');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
