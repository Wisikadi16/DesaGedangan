<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SyaratPelayanan extends Model
{
    use HasFactory;

    protected $fillable = ['judul_layanan', 'ikon', 'daftar_syarat'];
}