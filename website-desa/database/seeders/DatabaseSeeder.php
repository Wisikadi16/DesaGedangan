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
        // Password dibaca dari .env (ADMIN_PASSWORD). Kalau kosong, dibuat acak dan ditampilkan SEKALI di terminal.
        $password = env('ADMIN_PASSWORD') ?: Str::random(14);

        $admin = User::firstOrCreate(
            ['email' => 'admin@gedangan.desa.id'],
            ['name' => 'Admin Desa Gedangan', 'password' => Hash::make($password)]
        );

        if ($admin->wasRecentlyCreated) {
            $this->command?->info("Akun admin dibuat -> email: admin@gedangan.desa.id | password: {$password}");
        }

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