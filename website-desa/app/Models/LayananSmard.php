<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayananSmard extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'sub_judul',
        'paragraf_utama',
        'tujuan_poin',
        'gambar',
    ];
}