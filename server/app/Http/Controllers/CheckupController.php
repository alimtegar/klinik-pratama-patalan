<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Checkup;
use Carbon\Carbon;

class CheckupController extends Controller
{
    public function index(Request $request) {
        // $checkups = Checkup::all();

        $q = $request->q;
        $from = $request->from ? Carbon::parse($request->from) : Carbon::parse('1970-01-01');
        $to = $request->to ? Carbon::parse($request->to) : Carbon::now();

        $checkups = Checkup::select(
                        'checkups.id',
                        // 'patients.id as patient_id', 
                        'patients.name as patient_name',
                        // 'doctors.id as doctor_id', 
                        'doctors.name as doctor_name',
                        // 'rooms.id as room_id', 
                        'rooms.name as room_name',
                        'checkups.type',
                        'checkups.bill',
                        'checkups.created_at'
                        )
                        ->join('patients', 'patients.id', '=', 'checkups.patient_id')
                        ->join('doctors', 'doctors.id', '=', 'checkups.doctor_id')
                        ->join('rooms', 'rooms.id', '=', 'checkups.room_id')
                        ->where(function ($query) use ($q) {
                            $query->where('checkups.id', '=', $q)
                            // ->orWhere('email', '=', $q)
                            ->orWhere('patients.name', 'LIKE', '%' . $q . '%')
                            ->orWhere('doctors.name', 'LIKE', '%' . $q . '%')
                            ->orWhere('rooms.name', 'LIKE', '%' . $q . '%');
                        })
                        ->whereBetween('checkups.created_at', [$from, $to])
                        ->get();

        if ($checkups) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data pemeriksaan!',
                'data' => [
                    'checkups' => $checkups,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pemeriksaan tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function show($id) {
        $checkup = Checkup::select(
                    'checkups.id',
                    'checkups.type',
                    'checkups.bill',
                    'patients.id as patient_id', 
                    'patients.name as patient_name',
                    'doctors.id as doctor_id', 
                    'doctors.name as doctor_name',
                    'rooms.id as room_id', 
                    'rooms.name as room_name'
                    )
                    ->join('patients', 'patients.id', '=', 'checkups.patient_id')
                    ->join('doctors', 'doctors.id', '=', 'checkups.doctor_id')
                    ->join('rooms', 'rooms.id', '=', 'checkups.room_id')
                    ->where('checkups.id', $id)
                    ->first();

        if ($checkup) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data pemeriksaan!',
                'data' => [
                    'checkup' => $checkup,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pemeriksaan tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function create(Request $request) {
        $checkup = Checkup::create($request->all());

        if ($checkup) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk menambahkan data pemeriksaan!',
                'data' => [
                    'checkup' => $checkup,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Gagal untuk menambahkan data pemeriksaan!',
                'data' => null,
            ], 400);
        }
    }

    public function update(Request $request, $id) {
        $checkup = Checkup::find($id);

        if ($checkup) {
            $outdatedCheckup = $checkup->toArray();

            $isUpdated = $checkup->update($request->all());

            $updatedCheckup = $checkup->toArray();

            if ($isUpdated) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menyunting data pemeriksaan!',
                    'data' => [
                        'outdatedCheckup' => $outdatedCheckup,
                        'updatedCheckup' => $updatedCheckup,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menyunting data pemeriksaan!',
                    'data' => null,
                ], 400);
            }    
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pemeriksaan tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function destroy($id) {
        $checkup = Checkup::find($id);
        
        if ($checkup) {
            $deletedCheckup = $checkup->toArray();

            $isDeleted = $checkup->delete();

            if ($isDeleted) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menghapus data pemeriksaan!',
                    'data' => [
                        'deletedCheckup' => $deletedCheckup,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menghapus data pemeriksaan!',
                    'data' => null,
                ], 400);
            }    
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pemerikassan tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }
}
