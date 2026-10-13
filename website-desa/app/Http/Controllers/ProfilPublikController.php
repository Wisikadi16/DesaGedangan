<?php

namespace App\Http\Controllers;

use App\Models\Dusun;
use App\Models\VillageOfficial;
use Inertia\Inertia;

/**
 * Halaman publik menu "Profil".
 * Catatan: data `profil` (VillageProfile) sudah otomatis tersedia di SEMUA halaman
 * lewat HandleInertiaRequests, jadi tidak perlu dikirim ulang di sini.
 */
class ProfilPublikController extends Controller
{
    public function desa()
    {
        return Inertia::render('ProfilDesa');
    }

    public function pemerintahan()
    {
        return Inertia::render('Pemerintahan', [
            'perangkat' => VillageOfficial::orderBy('urutan')->orderBy('id')->get(),
        ]);
    }

    public function kondisi()
    {
        return Inertia::render('KondisiUmum');
    }

    public function penduduk()
    {
        return Inertia::render('ProfilPenduduk', [
            'dusun' => Dusun::orderBy('nama_dusun')->get(['id', 'nama_dusun', 'jumlah_penduduk']),
        ]);
    }

    public function masalah()
    {
        return Inertia::render('PotensiMasalah');
    }

    public function dusun()
    {
        return Inertia::render('Dusun', [
            'dusun' => Dusun::orderBy('nama_dusun')->get(),
        ]);
    }
}
