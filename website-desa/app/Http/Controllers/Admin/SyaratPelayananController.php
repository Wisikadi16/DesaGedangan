<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SyaratPelayanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SyaratPelayananController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/SyaratPelayanan/Index', [
            'syaratPelayanans' => SyaratPelayanan::all()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul_layanan' => 'required|string|max:255',
            'ikon' => 'nullable|string|max:10',
            'daftar_syarat' => 'required|string',
        ]);

        SyaratPelayanan::create($data);

        return redirect()->back()->with('message', 'Kategori layanan berhasil ditambahkan!');
    }

    public function update(Request $request, SyaratPelayanan $syaratPelayanan)
    {
        $data = $request->validate([
            'judul_layanan' => 'required|string|max:255',
            'ikon' => 'nullable|string|max:10',
            'daftar_syarat' => 'required|string',
        ]);

        $syaratPelayanan->update($data);

        return redirect()->back()->with('message', 'Kategori layanan berhasil diperbarui!');
    }

    public function destroy(SyaratPelayanan $syaratPelayanan)
    {
        $syaratPelayanan->delete();

        return redirect()->back()->with('message', 'Kategori layanan berhasil dihapus!');
    }
}