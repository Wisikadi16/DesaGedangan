<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\VillageProfile;
use App\Models\Category;
use App\Models\Dusun;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Akun Admin Desa
        User::create([
            'name' => 'Admin Desa Gedangan',
            'email' => 'admin@gedangan.desa.id',
            'password' => Hash::make('password123'), // Ini password buat login nanti
        ]);

        // 2. Buat Profil Desa Default
        VillageProfile::create([
            'nama_desa' => 'Desa Gedangan',
            'kecamatan' => 'Tuntang',
            'kabupaten' => 'Semarang',
            'provinsi' => 'Jawa Tengah',
            'deskripsi' => 'Website resmi Desa Gedangan, Kecamatan Tuntang. Dibangun untuk mempermudah informasi dan memajukan UMKM warga.',
            'email' => 'pemdes@gedangan.desa.id',
            'telepon' => '081234567890',
        ]);

        // 3. Buat Kategori Berita Bawaan
        $kategori = ['Pemerintahan', 'Kegiatan Desa', 'UMKM', 'Pendidikan', 'Kesehatan'];
        foreach ($kategori as $kat) {
            Category::create([
                'nama' => $kat,
                'slug' => Str::slug($kat)
            ]);
        }

        // 4. Buat Contoh Data Dusun
        Dusun::create([
            'nama_dusun' => 'Dusun Krajan',
            'nama_kepala_dusun' => 'Bapak Fulan',
            'jumlah_penduduk' => 450,
        ]);
    }
}