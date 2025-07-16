<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function storeApi(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
        ]);
        $todo = Todo::create($validated);
        return response()->json([
            'data' => $todo,
            'message' => 'Task created successfully',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
       public function show(Todo $todo)
    {
        return $todo;
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }


    /**
     * For toggling your todos.
     */
    public function todoToggleApi(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'completed' => 'boolean',
        ]);

        $todo->update($validated);

        return response()->json([
            'data' => $todo,
            'message' => 'Todo updated successfully.',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateApi(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $todo->update($validated);

        return response()->json([
            'data' => $todo,
            'message' => 'Todo updated successfully.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyApi(Todo $todo)
    {
        $todo->delete();
        return response()->json([
            'message' => 'Task deleted successfully',
        ], 201);
    }
}
