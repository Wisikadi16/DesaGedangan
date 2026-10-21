<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VillageProfile;
use App\Models\VillageOfficial;
use App\Models\Dusun;

class ProfilPublikController extends Controller
{
    public function index()
    {
        return inertia('ProfilDesa', [
            'profil' => VillageProfile::first(),
            'perangkat' => VillageOfficial::where('kategori', 'Perangkat Desa')->orderBy('urutan', 'asc')->get(),
            'bpd' => VillageOfficial::where('kategori', 'BPD')->orderBy('urutan', 'asc')->get(),
            'lkmd' => VillageOfficial::where('kategori', 'LKMD')->orderBy('urutan', 'asc')->get(),
            'tpk' => VillageOfficial::where('kategori', 'TPK/KPMD')->orderBy('urutan', 'asc')->get(),
            'pkk' => VillageOfficial::where('kategori', 'PKK')->orderBy('urutan', 'asc')->get(),
            'rtrw' => VillageOfficial::where('kategori', 'RT/RW')->orderBy('urutan', 'asc')->get(),
            'dusun' => Dusun::all(),
        ]);
    }
}