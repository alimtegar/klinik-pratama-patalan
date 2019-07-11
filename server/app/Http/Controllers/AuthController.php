<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class AuthController extends Controller
{
    public function register(Request $request) {
        $name = $request->input('name');
        $email = $request->input('email');
        $password = !is_null($request->input('password')) ? Hash::make($request->input('password')) : null;
        $role = $request->input('role');
        $apiToken = base64_encode(str_random(40));

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role' => $role,
            'api_token' => $apiToken,
        ]);

        if ($user) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk mendaftar!',
                'data' => [
                    'user' => $user,
                    'api_token' => $apiToken,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pengguna tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function login(Request $request) {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if ($user) {
            if (Hash::check($password, $user->password)) {
                $apiToken = base64_encode(str_random(40));

                $user->update([
                    'api_token' => $apiToken,
                ]);

                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk masuk!',
                    'data' => [
                        'user' => $user,
                        'api_token' => $apiToken,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Kata sandi salah!',
                    'data' => null,
                ], 400);
            }
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pengguna tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function validateApiToken(Request $request) {
        $apiToken = $request->input('api_token');

        $user = User::where('api_token', $apiToken)->first();

        if ($user) {
            $apiToken = base64_encode(str_random(40));

            $user->update([
                'api_token' => $apiToken,
            ]);

            return response()->json([
                'error' => false,
                'message' => 'Validasi token API sukses!',
                'data' => [
                    'user' => $user,
                    'api_token' => $apiToken,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pengguna tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }
}
