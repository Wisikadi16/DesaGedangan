<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PerangkatController extends Controller
{
    public function index(Request $request)
    {
        $kategori = $request->query('kategori', 'Perangkat Desa');

        $perangkat = VillageOfficial::where('kategori', $kategori)
            ->orderBy('urutan', 'asc')
            ->get();

        return Inertia::render('Admin/Perangkat/Index', [
            'perangkat' => $perangkat,
            'kategori_aktif' => $kategori
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Perangkat/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori' => 'required|string',
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'telepon' => 'nullable|string|max:30',
            'urutan' => 'nullable|integer',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('perangkat', 'public');
        }

        VillageOfficial::create($validated);

        return redirect()->route('admin.pemerintahan.index', ['kategori' => $request->kategori])
            ->with('message', 'Data berhasil ditambahkan!');
    }

    public function edit(VillageOfficial $pemerintahan)
    {
        return Inertia::render('Admin/Perangkat/Form', [
            'perangkat' => $pemerintahan
        ]);
    }

    public function update(Request $request, VillageOfficial $pemerintahan)
    {
        $validated = $request->validate([
            'kategori' => 'required|string',
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'telepon' => 'nullable|string|max:30',
            'urutan' => 'nullable|integer',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            if ($pemerintahan->foto) {
                Storage::disk('public')->delete($pemerintahan->foto);
            }
            $validated['foto'] = $request->file('foto')->store('perangkat', 'public');
        }

        $pemerintahan->update($validated);

        return redirect()->route('admin.pemerintahan.index', ['kategori' => $request->kategori])
            ->with('message', 'Data berhasil diperbarui!');
    }

    public function destroy(VillageOfficial $pemerintahan)
    {
        $kategori = $pemerintahan->kategori;
        if ($pemerintahan->foto) {
            Storage::disk('public')->delete($pemerintahan->foto);
        }
        $pemerintahan->delete();

        return redirect()->route('admin.pemerintahan.index', ['kategori' => $kategori])
            ->with('message', 'Data berhasil dihapus!');
    }
}