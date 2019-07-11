<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Patient;
use Carbon\Carbon;

class PatientController extends Controller
{
    public function index(Request $request) {
        // $patients = Patient::all();

        $q = $request->q;
        $from = $request->from ? Carbon::parse($request->from) : Carbon::parse('1970-01-01');
        $to = $request->to ? Carbon::parse($request->to) : Carbon::now();

        $patients = Patient::select(
                                    'id',
                                    'nik',
                                    'name',
                                    'type',
                                    'created_at'
                                )
                                ->where(function ($query) use ($q) {
                                    $query->where('id', '=', $q)
                                        ->orWhere('nik', '=', $q)
                                        ->orWhere('name', 'LIKE', '%' . $q . '%');
                                })
                                ->whereBetween('created_at', [$from, $to])
                                ->get();

        if ($patients) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data pasien!',
                'data' => [
                    'patients' => $patients,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pasien tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function show($id) {
        $patient = Patient::find($id);

        if ($patient) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk memuat data pasien!',
                'data' => [
                    'patient' => $patient,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pasien tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function create(Request $request) {
        $nik = $request->nik;
        $isNIKAlreadyInUse = Patient::where('email', '=', $nik);

        if ($isNIKAlreadyInUse) {
            return response()->json([
                'error' => true,
                'message' => 'NIK ' . $nik . ' telah terdaftar!',
                'data' => null,
            ], 400);
        }

        $patient = Patient::create($request->all());

        if ($patient) {
            return response()->json([
                'error' => false,
                'message' => 'Berhasil untuk menambahkan data pasien!',
                'data' => [
                    'patient' => $patient,
                ],
            ], 200);
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Gagal untuk menambahkan data pasien!',
                'data' => null,
            ], 400);
        }
    }

    public function update(Request $request, $id) {
        $patient = Patient::find($id);

        if ($patient) {
            $outdatedPatient = $patient->toArray();

            $isUpdated = $patient->update($request->all());

            $updatedPatient = $patient->toArray();

            if ($isUpdated) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menyunting data pasien!',
                    'data' => [
                        'outdatedPatient' => $outdatedPatient,
                        'updatedPatient' => $updatedPatient,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menyunting data pasien!',
                    'data' => null,
                ], 400);
            }    
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pasien tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }

    public function destroy($id) {
        $patient = Patient::find($id);
        
        if ($patient) {
            $deletedPatient = $patient->toArray();

            $isDeleted = $patient->delete();

            if ($isDeleted) {
                return response()->json([
                    'error' => false,
                    'message' => 'Berhasil untuk menghapus data pasien!',
                    'data' => [
                        'deletedPatient' => $deletedPatient,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'Gagal untuk menghapus data pasien!',
                    'data' => null,
                ], 400);
            }    
        } else {
            return response()->json([
                'error' => true,
                'message' => 'Data pasien tidak ditemukan!',
                'data' => null,
            ], 400);
        }
    }
}
