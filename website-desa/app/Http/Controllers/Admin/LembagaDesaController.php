<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LembagaDesa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LembagaDesaController extends Controller
{
    public function index(Request $request)
    {
        $kategori = $request->query('kategori', 'BPD'); // Default tab admin
        
        $lembaga = LembagaDesa::where('kategori', $kategori)->orderBy('id', 'asc')->get();

        return Inertia::render('Admin/Lembaga/Index', [
            'lembaga' => $lembaga,
            'kategori_aktif' => $kategori
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Lembaga/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori' => 'required|string',
            'jabatan' => 'nullable|string|max:255',
            'nama' => 'required|string|max:255',
            'alamat_atau_keterangan' => 'nullable|string|max:255',
        ]);

        LembagaDesa::create($validated);

        return redirect()->route('admin.lembaga.index', ['kategori' => $request->kategori])
            ->with('message', 'Data lembaga berhasil ditambahkan!');
    }

    public function edit(LembagaDesa $lembaga)
    {
        return Inertia::render('Admin/Lembaga/Form', [
            'lembaga' => $lembaga
        ]);
    }

    public function update(Request $request, LembagaDesa $lembaga)
    {
        $validated = $request->validate([
            'kategori' => 'required|string',
            'jabatan' => 'nullable|string|max:255',
            'nama' => 'required|string|max:255',
            'alamat_atau_keterangan' => 'nullable|string|max:255',
        ]);

        $lembaga->update($validated);

        return redirect()->route('admin.lembaga.index', ['kategori' => $request->kategori])
            ->with('message', 'Data lembaga berhasil diperbarui!');
    }

    public function destroy(LembagaDesa $lembaga)
    {
        $kategori = $lembaga->kategori;
        $lembaga->delete();

        return redirect()->route('admin.lembaga.index', ['kategori' => $kategori])
            ->with('message', 'Data berhasil dihapus!');
    }
}