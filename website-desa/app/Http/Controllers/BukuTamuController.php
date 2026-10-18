<?php

namespace App\Http\Controllers;

use App\Models\BukuTamu;
use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BukuTamuController extends Controller
{
    // Halaman Publik (Form Buku Tamu & Daftar Pesan)
    public function index(Request $request)
    {
        return Inertia::render('BukuTamu', [
            'auth' => [
                'user' => $request->user(),
            ],
            'profil' => VillageProfile::first(),
            'pesanTerbaru' => BukuTamu::latest()->get()
        ]);
    }

    // Simpan pesan dari warga
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'telepon' => 'nullable|string|max:20',
            'perihal' => 'nullable|string|max:255',
            'pesan' => 'required|string|max:2000',
        ]);

        BukuTamu::create($validated);

        return redirect()->back()->with('message', 'Terima kasih! Pesan atau masukan Anda berhasil dikirim.');
    }

    // Panel Admin: Lihat daftar buku tamu
    public function adminIndex()
    {
        return Inertia::render('Admin/BukuTamu/Index', [
            'pesanList' => BukuTamu::latest()->paginate(15)
        ]);
    }

    // Panel Admin: Kirim / Update Balasan Admin
    public function update(Request $request, $id)
    {
        $request->validate([
            'balasan' => 'required|string|max:2000',
        ]);

        $bukuTamu = BukuTamu::findOrFail($id);
        $bukuTamu->update([
            'balasan' => $request->balasan,
            'status' => 'dibaca'
        ]);

        return redirect()->back()->with('message', 'Balasan berhasil dikirim ke warga.');
    }

    // Panel Admin: Hapus pesan
    public function destroy($id)
    {
        BukuTamu::findOrFail($id)->delete();
        return redirect()->route('admin.buku-tamu.index')->with('message', 'Pesan berhasil dihapus.');
    }
}