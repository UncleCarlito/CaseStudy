<?php

namespace App\Http\Controllers\api;

use App\Models\project;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["data" => project::all()]);
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
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'status' => 'required'
        ]);

        $created = project::create($validatedData);
        return response()->json(["data" => $created]);
    }

    /**
     * Display the specified resource.
     */
    public function show(project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(project $project)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $project = project::find($id);
        if (!$project) {
            response()->json(["error" => "Project not found"]);
        }
        if ($request->has("title")) {
            $project->title = $request->input("title");
        }
        if ($request->has("description")) {
            $project->description = $request->input("description");
        }
        if ($request->has("status")) {
            $project->status = $request->input("status");
        }
        $project->save();
        return response()->json(["message" => "Project updated", "data" => project::find($id)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(["message" => "Project not found"]);
        }
        $project->delete();
        return response()->json(["message" => "Project deleted"]);
    }
}