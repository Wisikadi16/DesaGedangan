<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VillageProfile extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'kelompok_umur' => 'array',
        'pekerjaan' => 'array',
        'agama' => 'array',
    ];
}