<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'nik', 
        'name',
        'birth_date',
        'gender',
        'address',
        'province',
        'city',
        'district',
        'subdistrict',
        'rw',
        'rt',
        'religion',
        'education',
        'profession',
        'phone_number',
        'type',
    ];

    protected $hidden = [];
}
