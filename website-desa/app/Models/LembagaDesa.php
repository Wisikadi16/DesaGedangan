<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LembagaDesa extends Model
{
    use HasFactory;

    protected $fillable = [
        'kategori',
        'jabatan',
        'nama',
        'alamat_atau_keterangan',
    ];
}