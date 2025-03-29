<?php

use App\Http\Controllers\api\AuthenticationController;
use App\Http\Controllers\api\ProjectController;
use App\Http\Controllers\api\TasksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticationController::class, "login"]);


Route::middleware(["auth:sanctum"])->group(function () {
    Route::get('/projects', [ProjectController::class, "index"]);
    Route::post('/projects', [ProjectController::class, "store"]);
    Route::get('/projects/{id}', [ProjectController::class, "show"]);
    Route::put('/projects/{id}', [ProjectController::class, "update"]);
    Route::delete('/projects/{id}', [ProjectController::class, "destroy"]);
    Route::get('/projects/{id}/tasks', [TasksController::class, "index"]);
    Route::post('/logout', [AuthenticationController::class, "logout"]);
});