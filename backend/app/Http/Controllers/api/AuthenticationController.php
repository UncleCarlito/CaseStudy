<?php

namespace App\Http\Controllers\api;

use App\Models\Authentication;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{

    public function signup(Request $request)
    {
        $validatedData = $request->validate([
            'name' => "required",
            'email' => "required",
            'password' => "required",
            'role' => "required"
        ]);
        $created = user::create($validatedData);
        $token = $created->createToken($created->name);
        return response()->json(["message" => "User created", "token" => $token->plainTextToken]);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => "required",
            'password' => "required"
        ]);

        $user = User::firstWhere('email', $request->input("email"));
        if (!$user || !Hash::check($request->input("password"), $user->password)) {
            return response()->json(["message" => "User not found"]);
        }
        $token = $user->createToken($user->email);
        return response()->json(["token" => $token->plainTextToken, "user" => $user]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(["message" => "User logs out"], 200);
    }
}