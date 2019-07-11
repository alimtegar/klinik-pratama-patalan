<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Patient;
use App\Doctor;
use App\Room;

class Checkup extends Model
{
    protected $fillable = [
        'patient_id',
        'doctor_id',
        'room_id',
        'type',
        'bill'
    ];

    protected $hidden = [];

    public function patient() {
        return $this->hasOne(Patient::class);
    }

    public function doctor() {
        return $this->hasOne(Doctor::class);
    }

    public function room() {
        return $this->hasOne(Room::class);
    }
}
