<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dusun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DusunController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dusun/Index', [
            'dusun' => Dusun::orderBy('nama_dusun')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Dusun/Form', ['dusun' => null]);
    }

    public function store(Request $request)
    {
        Dusun::create($this->validated($request));

        return redirect()->route('admin.dusun.index')->with('message', 'Data dusun berhasil ditambahkan!');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Dusun/Form', [
            'dusun' => Dusun::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        Dusun::findOrFail($id)->update($this->validated($request));

        return redirect()->route('admin.dusun.index')->with('message', 'Data dusun berhasil diperbarui!');
    }

    public function destroy($id)
    {
        Dusun::findOrFail($id)->delete();

        return redirect()->route('admin.dusun.index')->with('message', 'Data dusun berhasil dihapus!');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'nama_dusun' => 'required|string|max:255',
            'nama_kepala_dusun' => 'nullable|string|max:255',
            'jumlah_penduduk' => 'nullable|integer|min:0|max:10000000',
            'alamat' => 'nullable|string|max:500',
            'deskripsi' => 'nullable|string|max:2000',
        ]);

        // Kolom angka tidak boleh NULL di database -> kosong dianggap 0
        $data['jumlah_penduduk'] = (int) ($data['jumlah_penduduk'] ?? 0);

        return $data;
    }
}
