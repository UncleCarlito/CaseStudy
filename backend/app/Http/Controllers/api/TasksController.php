<?php

namespace App\Http\Controllers\api;

use App\Models\tasks;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $item = tasks::where("project_id", $id)->get();
        return response()->json(["data" => $item]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(tasks $tasks)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tasks $tasks)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, tasks $tasks)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(tasks $tasks)
    {
        //
    }
}