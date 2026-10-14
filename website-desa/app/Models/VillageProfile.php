<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VillageProfile extends Model
{
    protected $fillable = [
        'nama_desa', 'kecamatan', 'kabupaten', 'provinsi', 
        'deskripsi', 'sejarah', 'visi', 'misi', 'kondisi_umum', 
        'luas_wilayah', 'potensi', 'masalah',
        'jumlah_laki_laki', 'jumlah_perempuan', 'jumlah_kk',
        'kelompok_umur', 'pekerjaan', 'agama' // Tambahkan ini
    ];

    // Beritahu Laravel agar otomatis mengubah JSON menjadi Array
    protected $casts = [
        'kelompok_umur' => 'array',
        'pekerjaan' => 'array',
        'agama' => 'array',
    ];
}