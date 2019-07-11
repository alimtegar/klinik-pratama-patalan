<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Carbon\Carbon;

class UserController extends Controller
{
    public function __construct() {
        // $this->middleware('auth');
    }

    public function index(Request $request) {
        // $users = User::all();

        $q = $request->q;
        $from = $request->from ? Carbon::parse($request->from) : Carbon::parse('1970-01-01');
        $to = $request->to ? Carbon::parse($request->to) : Carbon::now();

        $users = User::where(function ($query) use ($q) {
                                    $query->where('id', '=', $q)
                                        ->orWhere('email', '=', $q)
                                        ->orWhere('name', 'LIKE', '%' . $q . '%');
                                })
                                ->whereBetween('created_at', [$from, $to])
                                ->get();

        if ($users) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data pengguna!',
                'data' => [
                    'users' => $users,
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

    public function show($id) {
        $user = User::find($id);

        if ($user) {
            return response()->json([
                'error' => false,
                'message' => 'Data pengguna ditemukan!',
                'data' => [
                    'user' => $user,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pengguna tidak ditemukan!',
                'data' => null,
            ], 404);
        }
    }

    public function create(Request $request) {
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
                'message' => 'Berhasil untuk menambahkan data pengguna!',
                'data' => [
                    'user' => $user,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Gagal untuk menambahkan data pengguna!',
                'data' => null,
            ], 400);
        }
    }

    public function update(Request $request, $id) {
        $user = User::find($id);

        if ($user) {
            $outdatedUser = $user->toArray();

            $isUpdated = $user->update($request->all());

            $updatedUser = $user->toArray();

            if ($isUpdated) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menyunting data pengguna!',
                    'data' => [
                        'outdatedUser' => $outdatedUser,
                        'updatedUser' => $updatedUser,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menyunting data pengguna!',
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

    public function destroy($id) {
        $user = User::find($id);
        
        if ($user) {
            $deletedUser = $user->toArray();

            $isDeleted = $user->delete();

            if ($isDeleted) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menghapus data pengguna!',
                    'data' => [
                        'deletedUser' => $deletedUser,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menghapus data pengguna!',
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
}
