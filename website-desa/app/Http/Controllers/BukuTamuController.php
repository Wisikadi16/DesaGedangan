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
            // AMAN: Nomor telepon pengunjung disaring agar tidak ikut bocor ke publik, dibatasi 20 pesan terbaru
            'pesanTerbaru' => BukuTamu::latest()
                ->take(20)
                ->get(['id', 'nama', 'perihal', 'pesan', 'balasan', 'created_at'])
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