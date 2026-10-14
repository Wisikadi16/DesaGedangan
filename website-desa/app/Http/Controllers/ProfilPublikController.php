<?php

namespace App\Http\Controllers;

use App\Models\VillageProfile;
use App\Models\VillageOfficial;
use App\Models\Dusun;
use Inertia\Inertia;

class ProfilPublikController extends Controller
{
    public function index()
    {
        return Inertia::render('ProfilDesa', [
            'profil' => VillageProfile::first(),
            'perangkat' => VillageOfficial::orderBy('urutan')->get(),
            'dusun' => Dusun::all(),
        ]);
    }
}