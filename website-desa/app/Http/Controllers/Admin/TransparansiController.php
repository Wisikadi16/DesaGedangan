<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transparansi;
use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TransparansiController extends Controller
{
    // === FUNGSI UNTUK HALAMAN PUBLIK (WARGA) ===
    public function publicIndex()
    {
        return Inertia::render('Transparansi', [
            'title' => 'Transparansi Desa',
            'profil' => VillageProfile::first(),
            'transparansis' => Transparansi::latest('tanggal')->get(),
        ]);
    }

    // ======================================================
    // === FUNGSI UNTUK HALAMAN ADMIN (CRUD) ===
    // ======================================================

    // 1. Nampilin tabel daftar transparansi di Dashboard Admin
    public function index()
    {
        return Inertia::render('Admin/Transparansi/Index', [
            'transparansis' => Transparansi::latest()->get()
        ]);
    }

    // 2. Nampilin form tambah data
    public function create()
    {
        return Inertia::render('Admin/Transparansi/Create');
    }

    // 3. Proses simpan data ke database
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'tahun' => 'nullable|numeric',
            'kategori' => 'required|string',
            'tanggal' => 'nullable|date',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'file_lampiran' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:5120', // Maks 5MB
        ]);

        // Proses upload gambar kalau ada
        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('transparansi/gambar', 'public');
        }

        // Proses upload dokumen/lampiran kalau ada
        if ($request->hasFile('file_lampiran')) {
            $validated['file_lampiran'] = $request->file('file_lampiran')->store('transparansi/lampiran', 'public');
        }

        Transparansi::create($validated);

        return redirect()->route('admin.transparansi.index')->with('success', 'Data Transparansi berhasil ditambahkan.');
    }

    // 4. Nampilin form edit data
    public function edit(Transparansi $transparansi)
    {
        return Inertia::render('Admin/Transparansi/Edit', [
            'transparansi' => $transparansi
        ]);
    }

    // 5. Proses update data ke database
    public function update(Request $request, Transparansi $transparansi)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'tahun' => 'nullable|numeric',
            'kategori' => 'required|string',
            'tanggal' => 'nullable|date',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'file_lampiran' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:5120',
        ]);

        // Cek kalau admin upload gambar baru
        if ($request->hasFile('gambar')) {
            // Hapus gambar lama kalau ada
            if ($transparansi->gambar) {
                Storage::disk('public')->delete($transparansi->gambar);
            }
            $validated['gambar'] = $request->file('gambar')->store('transparansi/gambar', 'public');
        }

        // Cek kalau admin upload file lampiran baru
        if ($request->hasFile('file_lampiran')) {
            // Hapus lampiran lama kalau ada
            if ($transparansi->file_lampiran) {
                Storage::disk('public')->delete($transparansi->file_lampiran);
            }
            $validated['file_lampiran'] = $request->file('file_lampiran')->store('transparansi/lampiran', 'public');
        }

        $transparansi->update($validated);

        return redirect()->route('admin.transparansi.index')->with('success', 'Data Transparansi berhasil diperbarui.');
    }

    // 6. Proses hapus data
    public function destroy(Transparansi $transparansi)
    {
        // Hapus file fisik dari storage
        if ($transparansi->gambar) {
            Storage::disk('public')->delete($transparansi->gambar);
        }
        if ($transparansi->file_lampiran) {
            Storage::disk('public')->delete($transparansi->file_lampiran);
        }

        // Hapus data dari database
        $transparansi->delete();

        return redirect()->route('admin.transparansi.index')->with('success', 'Data Transparansi berhasil dihapus.');
    }
}