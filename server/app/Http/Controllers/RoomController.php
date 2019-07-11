<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Room;

class RoomController extends Controller
{
    public function index() {
        $rooms = Room::all();

        if ($rooms) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data kamar!',
                'data' => [
                    'rooms' => $rooms,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data kamar tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function show($id) {
        $room = Room::find($id);

        if ($room) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data kamar!',
                'data' => [
                    'room' => $room,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data kamar tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function create(Request $request) {
        $room = Room::create($request->all());

        if ($room) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk menambahkan data kamar!',
                'data' => [
                    'room' => $room,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Gagal untuk menambahkan data kamar!',
                'data' => null,
            ], 400);
        }
    }

    public function update(Request $request, $id) {
        $room = Room::find($id);

        if ($room) {
            $outdatedRoom = $room->toArray();

            $isUpdated = $room->update($request->all());

            $updatedRoom = $room->toArray();

            if ($isUpdated) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menyunting data kamar!',
                    'data' => [
                        'outdatedRoom' => $outdatedRoom,
                        'updatedRoom' => $updatedRoom,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menyunting data kamar!',
                    'data' => null,
                ], 400);
            }    
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data kamar tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function destroy($id) {
        $room = Room::find($id);
        
        if ($room) {
            $deletedRoom = $room->toArray();

            $isDeleted = $room->delete();

            if ($isDeleted) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menghapus data kamar!',
                    'data' => [
                        'deletedRoom' => $deletedRoom,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menghapus data kamar!',
                    'data' => null,
                ], 400);
            }    
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data kamar tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }
}
