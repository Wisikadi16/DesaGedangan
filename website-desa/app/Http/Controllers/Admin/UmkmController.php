<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use App\Models\VillageProfile; // Tambahan untuk ambil profil desa
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UmkmController extends Controller
{
    public function index()
    {
        $umkm = Umkm::latest()->get();
        return Inertia::render('Admin/Umkm/Index', [
            'umkm' => $umkm
        ]);
    }

    // --- TAMBAHAN UNTUK HALAMAN PUBLIK DIREKTORI UMKM ---
    public function publicIndex()
    {
        $umkm = Umkm::latest()->get();
        $profil = VillageProfile::first();

        return Inertia::render('UmkmIndex', [
            'umkm' => $umkm,
            'profil' => $profil
        ]);
    }
    // --------------------------------------------------

    public function create()
    {
        return Inertia::render('Admin/Umkm/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'pemilik' => 'required|string|max:255',
            'deskripsi' => 'required',
            'nomor_wa' => 'nullable|string|max:20'
        ]);

        Umkm::create([
            'nama' => $request->nama,
            'slug' => Str::slug($request->nama),
            'pemilik' => $request->pemilik,
            'deskripsi' => $request->deskripsi,
            'nomor_wa' => $request->nomor_wa,
            'status' => 'aktif'
        ]);

        return redirect()->route('admin.umkm.index')->with('message', 'Data UMKM berhasil ditambahkan!');
    }

    public function destroy(Umkm $umkm)
    {
        $umkm->delete();
        return redirect()->route('admin.umkm.index')->with('message', 'Data UMKM berhasil dihapus!');
    }
}