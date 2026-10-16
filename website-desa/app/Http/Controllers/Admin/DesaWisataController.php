<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DesaWisata;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesaWisataController extends Controller
{
    // Menampilkan halaman form admin
    public function index()
    {
        // Ambil data pertama, jika belum ada buat instance kosong
        $desaWisata = DesaWisata::first() ?? new DesaWisata();
        
        return Inertia::render('Admin/DesaWisata/Index', [
            'desaWisata' => $desaWisata
        ]);
    }

    // Menyimpan / mengupdate data dari form admin
    public function update(Request $request)
    {
        $data = $request->validate([
            'narasi_utama' => 'nullable|string',
            'visi_misi' => 'nullable|string',
            'sarana' => 'nullable|string',
            'obyek_wisata' => 'nullable|string',
            'kuliner_ndeso' => 'nullable|string',
            'even' => 'nullable|string',
            'info_paket' => 'nullable|string',
            'pokdarwis' => 'nullable|string',
        ]);

        $desaWisata = DesaWisata::first();
        
        if ($desaWisata) {
            $desaWisata->update($data);
        } else {
            DesaWisata::create($data);
        }

        return redirect()->back()->with('message', 'Data Desa Wisata berhasil diperbarui!');
    }
}