<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Doctor;

class DoctorController extends Controller
{
    public function index() {
        $doctors = Doctor::all();

        if ($doctors) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data pemeriksaan!',
                'data' => [
                    'doctors' => $doctors,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data dokter tidak ditemukan',
                'data' => null,
            ], 400);
        }
    }

    public function show($id) {
        $doctor = Doctor::find($id);

        if ($doctor) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data dokter!',
                'data' => [
                    'doctor' => $doctor,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data dokter tidak ditemukan',
                'data' => null,
            ], 400);
        }
    }

    public function create(Request $request) {
        $doctor = Doctor::create($request->all());

        if ($doctor) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk menambahkan data dokter!',
                'data' => [
                    'doctor' => $doctor,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Failed to add doctor!',
                'data' => null,
            ], 400);
        }
    }

    public function update(Request $request, $id) {
        $doctor = Doctor::find($id);

        if ($doctor) {
            $outdatedDoctor = $doctor->toArray();

            $isUpdated = $doctor->update($request->all());

            $updatedDoctor = $doctor->toArray();

            if ($isUpdated) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menyunting data dokter!',
                    'data' => [
                        'outdatedDoctor' => $outdatedDoctor,
                        'updatedDoctor' => $updatedDoctor,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menyunting data dokter!',
                    'data' => null,
                ], 400);
            }    
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data dokter tidak ditemukan',
                'data' => null,
            ], 400);
        }
    }

    public function destroy($id) {
        $doctor = Doctor::find($id);
        
        if ($doctor) {
            $deletedDoctor = $doctor->toArray();

            $isDeleted = $doctor->delete();

            if ($isDeleted) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menghapus data dokter!',
                    'data' => [
                        'deletedDoctor' => $deletedDoctor,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menhapus data dokter!',
                    'data' => null,
                ], 400);
            }    
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data dokter tidak ditemukan',
                'data' => null,
            ], 400);
        }
    }
}
