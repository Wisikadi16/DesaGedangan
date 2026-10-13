<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PerangkatController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Perangkat/Index', [
            'perangkat' => VillageOfficial::orderBy('urutan')->orderBy('id')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Perangkat/Form', ['perangkat' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        // Urutan kosong -> taruh di paling akhir
        $data['urutan'] = $data['urutan'] ?? ((int) VillageOfficial::max('urutan') + 1);
        $data['foto'] = $request->hasFile('foto')
            ? $request->file('foto')->store('perangkat', 'public')
            : null;

        VillageOfficial::create($data);

        return redirect()->route('admin.pemerintahan.index')->with('message', 'Perangkat desa berhasil ditambahkan!');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Perangkat/Form', [
            'perangkat' => VillageOfficial::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        $perangkat = VillageOfficial::findOrFail($id);

        $data = $request->validate($this->rules());

        // Urutan dikosongkan -> pertahankan urutan lama
        $data['urutan'] = $data['urutan'] ?? $perangkat->urutan;

        if ($request->hasFile('foto')) {
            $baru = $request->file('foto')->store('perangkat', 'public');
            if ($perangkat->foto) {
                Storage::disk('public')->delete($perangkat->foto);
            }
            $data['foto'] = $baru;
        } else {
            unset($data['foto']);
        }

        $perangkat->update($data);

        return redirect()->route('admin.pemerintahan.index')->with('message', 'Data perangkat desa berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $perangkat = VillageOfficial::findOrFail($id);

        if ($perangkat->foto) {
            Storage::disk('public')->delete($perangkat->foto);
        }

        $perangkat->delete();

        return redirect()->route('admin.pemerintahan.index')->with('message', 'Perangkat desa berhasil dihapus!');
    }

    private function rules(): array
    {
        return [
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'telepon' => 'nullable|string|max:30',
            'deskripsi' => 'nullable|string|max:1000',
            'urutan' => 'nullable|integer|min:0|max:1000',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ];
    }
}
