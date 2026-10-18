<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transparansi extends Model
{
    use HasFactory;

    // Nama tabel disesuaikan dengan migration (tanpa 's')
    protected $table = 'transparansi';

    protected $fillable = [
        'judul',
        'tahun',
        'kategori',
        'tanggal',
        'deskripsi',
        'gambar',
        'file_lampiran',
    ];
}