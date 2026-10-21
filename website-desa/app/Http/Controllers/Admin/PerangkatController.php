<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PerangkatController extends Controller
{
    // Harus sama dengan daftar di Index.jsx dan Form.jsx
    private const KATEGORI = ['Perangkat Desa', 'BPD', 'LKMD', 'TPK/KPMD', 'PKK', 'RT/RW', 'Ormas/Pemuda'];

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

    public function create(Request $request)
    {
        return Inertia::render('Admin/Perangkat/Form', [
            // Kategori awal mengikuti tab yang sedang dibuka di halaman daftar
            'kategori_awal' => $request->query('kategori', 'Perangkat Desa'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());

        // Kolom urutan tidak boleh NULL di database -> kalau kosong, taruh di paling akhir pada kategori yang sama
        $validated['urutan'] = $validated['urutan']
            ?? ((int) VillageOfficial::where('kategori', $validated['kategori'])->max('urutan') + 1);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('perangkat', 'public');
        } else {
            unset($validated['foto']);
        }

        VillageOfficial::create($validated);

        return redirect()->route('admin.pemerintahan.index', ['kategori' => $validated['kategori']])
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
        $validated = $request->validate($this->rules());

        // Urutan dikosongkan -> pertahankan urutan lama (kolom tidak boleh NULL)
        $validated['urutan'] = $validated['urutan'] ?? $pemerintahan->urutan;

        if ($request->hasFile('foto')) {
            // Simpan foto baru DULU; hapus foto lama hanya kalau penyimpanan berhasil
            $fotoBaru = $request->file('foto')->store('perangkat', 'public');
            if ($pemerintahan->foto) {
                Storage::disk('public')->delete($pemerintahan->foto);
            }
            $validated['foto'] = $fotoBaru;
        } else {
            // Tidak ada upload baru -> JANGAN sentuh kolom foto.
            // (Tanpa ini, nilai null dari form menimpa foto lama sehingga fotonya hilang.)
            unset($validated['foto']);
        }

        $pemerintahan->update($validated);

        return redirect()->route('admin.pemerintahan.index', ['kategori' => $validated['kategori']])
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

    /** Aturan validasi dipakai bersama oleh store() dan update(). */
    private function rules(): array
    {
        return [
            'kategori' => ['required', Rule::in(self::KATEGORI)],
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'telepon' => 'nullable|string|max:30',
            'urutan' => 'nullable|integer|min:0',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }
}