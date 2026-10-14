<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfilController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Profil/Index', [
            'profil' => $this->profil(),
        ]);
    }

    public function update(Request $request)
    {
        $profil = $this->profil();

        $data = $request->validate([
            // Identitas & kontak
            'nama_desa' => 'required|string|max:255',
            'kecamatan' => 'required|string|max:255',
            'kabupaten' => 'required|string|max:255',
            'provinsi' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|max:1000',
            'alamat' => 'nullable|string|max:500',
            'telepon' => 'nullable|string|max:30',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',

            // Sejarah, visi, misi
            'sejarah' => 'nullable|string|max:20000',
            'visi' => 'nullable|string|max:2000',
            'misi' => 'nullable|string|max:5000',

            // Kondisi umum & Geografis (Tambahan baru)
            'luas_wilayah' => 'nullable|string|max:100',
            'letak_geografis' => 'nullable|string|max:255',
            'ketinggian' => 'nullable|string|max:255',
            'batas_utara' => 'nullable|string|max:255',
            'batas_selatan' => 'nullable|string|max:255',
            'batas_timur' => 'nullable|string|max:255',
            'batas_barat' => 'nullable|string|max:255',
            'iklim' => 'nullable|string|max:100',
            'suhu' => 'nullable|string|max:100',
            'curah_hujan' => 'nullable|string|max:100',
            'kelembaban' => 'nullable|string|max:100',
            'luas_datar' => 'nullable|string|max:100',
            'luas_pegunungan' => 'nullable|string|max:100',
            'sawah_irigasi' => 'nullable|string|max:100',
            'pemukiman' => 'nullable|string|max:100',
            'kondisi_umum' => 'nullable|string|max:10000',

            // Kependudukan & Data JSON
            'jumlah_laki_laki' => 'nullable|integer|min:0|max:10000000',
            'jumlah_perempuan' => 'nullable|integer|min:0|max:10000000',
            'jumlah_kk' => 'nullable|integer|min:0|max:10000000',
            'kelompok_umur' => 'nullable|array',
            'pekerjaan' => 'nullable|array',
            'agama' => 'nullable|array',

            // Potensi & masalah
            'potensi' => 'nullable|string|max:10000',
            'masalah' => 'nullable|string|max:10000',

            // Gambar
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        // Kolom angka tidak boleh NULL di database -> kosong dianggap 0
        foreach (['jumlah_laki_laki', 'jumlah_perempuan', 'jumlah_kk'] as $field) {
            $data[$field] = (int) ($data[$field] ?? 0);
        }

        // Gambar: simpan yang baru dulu, baru hapus yang lama. Tanpa upload -> biarkan apa adanya.
        foreach (['logo', 'cover'] as $field) {
            if ($request->hasFile($field)) {
                $baru = $request->file($field)->store('profil', 'public');
                if ($profil->{$field}) {
                    Storage::disk('public')->delete($profil->{$field});
                }
                $data[$field] = $baru;
            } else {
                unset($data[$field]);
            }
        }

        $profil->update($data);

        return redirect()->route('admin.profil.index')->with('message', 'Profil desa berhasil diperbarui!');
    }

    /** Profil desa hanya ada satu baris; dibuatkan otomatis kalau tabel masih kosong. */
    private function profil(): VillageProfile
    {
        return VillageProfile::first() ?? VillageProfile::create([]);
    }
}