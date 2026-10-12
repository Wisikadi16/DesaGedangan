<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage; // <--- WAJIB TAMBAH INI

class UmkmController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/UMKM/Index', ['umkm' => Umkm::latest()->get()]);
    }

    public function publicIndex()
    {
        return Inertia::render('UmkmIndex', [
            'umkm' => Umkm::latest()->get(),
            'profil' => VillageProfile::first()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/UMKM/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_umkm' => 'required|string|max:255',
            'pemilik' => 'required|string|max:255',
            'kategori' => 'nullable|string|max:255',
            'deskripsi' => 'required',
            'whatsapp' => 'nullable|string|max:20',
            'produk' => 'nullable|string',
            'alamat' => 'nullable|string',
            'google_maps_url' => 'nullable|url',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240'
        ]);

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('umkm_photos', 'public');
        }

        Umkm::create([
            'nama_umkm' => $request->nama_umkm,
            'pemilik' => $request->pemilik,
            'kategori' => $request->kategori,
            'deskripsi' => $request->deskripsi,
            'whatsapp' => $request->whatsapp,
            'produk' => $request->produk,
            'alamat' => $request->alamat,
            'google_maps_url' => $request->google_maps_url,
            'gambar' => $gambarPath,
        ]);

        return redirect()->route('admin.umkm.index')->with('message', 'Data UMKM berhasil ditambahkan!');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/UMKM/Edit', ['umkm' => Umkm::findOrFail($id)]);
    }

    public function update(Request $request, $id)
    {
        $umkm = Umkm::findOrFail($id);

        $request->validate([
            'nama_umkm' => 'required|string|max:255',
            'pemilik' => 'required|string|max:255',
            'deskripsi' => 'required',
            'whatsapp' => 'nullable|string|max:20',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240'
        ]);

        $gambarPath = $umkm->gambar; // Default pakai gambar lama

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if ($umkm->gambar && Storage::disk('public')->exists($umkm->gambar)) {
                Storage::disk('public')->delete($umkm->gambar);
            }
            // Simpan gambar baru
            $gambarPath = $request->file('gambar')->store('umkm_photos', 'public');
        }

        $umkm->update([
            'nama_umkm' => $request->nama_umkm,
            'pemilik' => $request->pemilik,
            'deskripsi' => $request->deskripsi,
            'whatsapp' => $request->whatsapp,
            'gambar' => $gambarPath,
        ]);

        return redirect()->route('admin.umkm.index')->with('message', 'Data UMKM berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $umkm = Umkm::findOrFail($id);
        
        // Hapus file fisik gambarnya
        if ($umkm->gambar && Storage::disk('public')->exists($umkm->gambar)) {
            Storage::disk('public')->delete($umkm->gambar);
        }

        $umkm->delete();
        return redirect()->route('admin.umkm.index')->with('message', 'Data UMKM berhasil dihapus!');
    }
}