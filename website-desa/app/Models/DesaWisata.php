<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesaWisata extends Model
{
    use HasFactory;

    // Daftarkan semua kolom agar bisa disimpan (Mass Assignment)
    protected $fillable = [
        'narasi_utama',
        'visi_misi',
        'sarana',
        'obyek_wisata',
        'kuliner_ndeso',
        'even',
        'info_paket',
        'pokdarwis',
    ];
}