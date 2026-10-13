<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UmkmController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/UMKM/Index', ['umkm' => Umkm::latest()->get()]);
    }

    public function publicIndex()
    {
        return Inertia::render('UmkmIndex', [
            'umkm' => Umkm::latest()->get(),
            'profil' => VillageProfile::first(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/UMKM/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        $data['whatsapp'] = $this->normalizeWhatsapp($data['whatsapp'] ?? null);
        $data['gambar'] = $request->hasFile('gambar')
            ? $request->file('gambar')->store('umkm_photos', 'public')
            : null;

        Umkm::create($data);

        return redirect()->route('admin.umkm.index')->with('message', 'Data UMKM berhasil ditambahkan!');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/UMKM/Edit', ['umkm' => Umkm::findOrFail($id)]);
    }

    public function update(Request $request, $id)
    {
        $umkm = Umkm::findOrFail($id);

        $data = $request->validate($this->rules());

        $data['whatsapp'] = $this->normalizeWhatsapp($data['whatsapp'] ?? null);

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama (jika ada), lalu simpan yang baru
            if ($umkm->gambar && Storage::disk('public')->exists($umkm->gambar)) {
                Storage::disk('public')->delete($umkm->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('umkm_photos', 'public');
        } else {
            // Tidak ada upload baru -> pertahankan gambar lama
            $data['gambar'] = $umkm->gambar;
        }

        $umkm->update($data);

        return redirect()->route('admin.umkm.index')->with('message', 'Data UMKM berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $umkm = Umkm::findOrFail($id);

        // Hapus file fisik gambarnya
        if ($umkm->gambar && Storage::disk('public')->exists($umkm->gambar)) {
            Storage::disk('public')->delete($umkm->gambar);
        }

        $umkm->delete();

        return redirect()->route('admin.umkm.index')->with('message', 'Data UMKM berhasil dihapus!');
    }

   
    private function rules(): array
    {
        return [
            'nama_umkm' => 'required|string|max:255',
            'pemilik' => 'required|string|max:255',
            'kategori' => 'nullable|string|max:255',
            'deskripsi' => 'required|string',
            'whatsapp' => 'nullable|string|max:20',
            'produk' => 'nullable|string',
            'alamat' => 'nullable|string',
            'google_maps_url' => 'nullable|url',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
        ];
    }

  
    private function normalizeWhatsapp(?string $nomor): ?string
    {
        $nomor = preg_replace('/\D/', '', $nomor ?? '');

        if ($nomor === '') {
            return null;
        }
        if (str_starts_with($nomor, '0')) {
            return '62' . substr($nomor, 1);
        }
        if (str_starts_with($nomor, '8')) {
            return '62' . $nomor;
        }

        return $nomor;
    }
}