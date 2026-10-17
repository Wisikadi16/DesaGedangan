<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PotensiDesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PotensiDesaController extends Controller
{
    // Menampilkan halaman tabel admin
    public function index()
    {
        $potensi = PotensiDesa::latest('tanggal')->get();
        return Inertia::render('Admin/PotensiDesa/Index', [
            'potensi' => $potensi
        ]);
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|in:Pariwisata,Pasar Desa,Kesenian',
            'konten' => 'required|string',
            'tanggal' => 'required|date',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('potensi', 'public');
        }

        PotensiDesa::create($data);

        return redirect()->back()->with('message', 'Data Potensi berhasil ditambahkan!');
    }

    // Mengupdate data
    public function update(Request $request, $id)
    {
        $potensi = PotensiDesa::findOrFail($id);

        $data = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|in:Pariwisata,Pasar Desa,Kesenian',
            'konten' => 'required|string',
            'tanggal' => 'required|date',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            if ($potensi->gambar) {
                Storage::disk('public')->delete($potensi->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('potensi', 'public');
        }

        $potensi->update($data);

        return redirect()->back()->with('message', 'Data Potensi berhasil diperbarui!');
    }

    // Menghapus data
    public function destroy($id)
    {
        $potensi = PotensiDesa::findOrFail($id);
        if ($potensi->gambar) {
            Storage::disk('public')->delete($potensi->gambar);
        }
        $potensi->delete();

        return redirect()->back()->with('message', 'Data Potensi berhasil dihapus!');
    }
}