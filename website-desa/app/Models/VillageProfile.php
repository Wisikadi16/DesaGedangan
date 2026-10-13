<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VillageProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_desa', 
        'deskripsi', 
        'sejarah', 
        'visi', 
        'misi', 
        'logo',
        'luas_wilayah', 
        'batas_utara', 
        'batas_selatan', 
        'batas_timur', 
        'batas_barat',
        'kondisi_umum', 
        'jumlah_laki_laki', 
        'jumlah_perempuan', 
        'jumlah_kk',
        'potensi', 
        'masalah'
    ];
}