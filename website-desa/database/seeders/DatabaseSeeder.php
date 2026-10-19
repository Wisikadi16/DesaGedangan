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
        $password = env('ADMIN_PASSWORD') ?: Str::random(14);

        $admin = User::firstOrCreate(
            ['email' => 'admin@gedangan.desa.id'],
            ['name' => 'Admin Desa Gedangan', 'password' => Hash::make($password)]
        );

        if ($admin->wasRecentlyCreated) {
            $this->command?->info("Akun admin dibuat -> email: admin@gedangan.desa.id | password: {$password}");
        }

        // 2. Buat Profil Desa Default (Lengkap dengan Sejarah Asli Arsip Desa)
        // Pakai updateOrCreate biar kalau ID 1 sudah ada, dia cuma update / skip tanpa bikin error
        VillageProfile::updateOrCreate(
            ['id' => 1],
            [
                'nama_desa' => 'Desa Gedangan',
                'kecamatan' => 'Tuntang',
                'kabupaten' => 'Semarang',
                'provinsi' => 'Jawa Tengah',
                'deskripsi' => 'Website resmi Desa Gedangan, Kecamatan Tuntang. Dibangun untuk mempermudah informasi dan memajukan UMKM warga.',
                'email' => 'pemdes@gedangan.desa.id',
                'telepon' => '081234567890',
                'sejarah' => "Gedangan, adalah merupakan sebuah nama salah satu desa yang terletak di kecamatan Tuntang, kabupaten Semarang. Desa Gedangan terletak di tengah-tengah kawasan kaki gunung Merbabu dan daerah sekitar Rawa Pening, sehingga Gedangan mempunyai daerah perkebunan, kehutanan dan persawahan. Desa Gedangan wilayah topografisnya 500 m diatas permukaan laut dan beriklim tropis bersuhu kisaran 20°C – 30 °C sehingga menjadikan Desa Gedangan wilayah yang sejuk, dan cocok dijadikan tempat persinggahan.\n\n" .
                             "Letak geografis desa Gedangan di koordinat 110.4625\" bujur Timur dan -7.332383\" Lintang Selatan, dengan luas wilayah 267,707 Ha. Batas wilayah desa Gedangan sebelah barat adalah Kalibeji dan desa Rowosari, sebelah selatan desa Polobogo, sebelah utara desa Sraten, dan sebelah timur berbatasan dengan wilayah Kota Salatiga, sehingga warga Gedangan sering menyebutnya sebagai bagian dari wilayah Kota Salatiga.\n\n" .
                             "Pada masa Penjajahan Belanda banyak para bangsawan yang menjadi Pejabat di Keraton Solo beserta prajuritnya melahirkan diri karena tidak berkenan dengan kebijakan pihak Belanda,termasuk Wijaya Kusuma dan Wicitra Kusuma.Mereka lari tanpa tujuan yang pasti melewati banyak daerah dengan beraneka ragam situasi,namun mereka belum juga menemukan daerah yang dirasa aman hingga sampailah mereka ke sebuah daerah yang bertujuan yang sangat subur dan daerah tersebut banyak ditumbuhi pohon Pisang atau dalam bahasa Jawa disebut Gedang. Mereka memutuskan untuk menetap didaerah tersebut dengan mata pencaharian bercocok tanam dan mereka semua merasa nyaman. Semakin lama daerah tersebut menjadi berkembang. Dan sesuai perkembangan jaman maka daerah tersebut dipanggil dengan sebutan Gedanggan.\n\n" .
                             "Namun dalam versi lain ada sesepuh yang menyatakan bahwa Wijaya Kusuma dan Wicitra Kusuma beserta anak buahnya lari dari wilayah Keraton Solo karena dikejar Pasukan Belanda dalam sebuah pertempuran .Mereka melahirkan diri tanpa arah dan tujuan, hingga mereka hampir tersusul oleh pasukan Belanda .Kecelakaan dalam jumlah dan persenjataan wijaya Kusuma .Wicitra Kusuma prajuritnya bersembyunyi didaerah yang penuh dengan pohon Gedang atau Pisang, setelah Belanda pergi dan keadaan dirasa aman mereka memutuskan didaerah tersebut dan untuk mengenang tempat persembunyian mereka dari kejaran pasukan Belanda mereka menamakan daerah tempat tinggal mereka yang penuh dengan pohon pisang atau Gedang dengan nama Gedangan.Setelah meninggal Wijaya Kusuma dimakamkan di pemakaman kecil sedangkan Wicitra Kusuma dimakamkan di pemakaman Gede.Setelah Indonesia merdeka daerah Gedangan sudah mulai ada pemerintahan desa dengan lurah Nyai Samban seorang wanita .Pada masa pemerintahan lurah Sumarno setelah Nyai Samban wafat ada peraturan yang menyatakan jumlah minimal penduduk dalam satu desa ,kemudian diadakan penggabungan dengan dusun Bandongan ,sebuah dusun yang bersebelahan dengan Gedangan. Untuk nama desa kemudian diundi antara nama Bandongan dan Gedangan, dan yang keluar adalah nama Gedangan. Sejak saat itu Gedangan sah menjadi nama desa yang hingga sekarang sudah berkembang dengan pesat.",
            ]
        );

        // 3. Buat Kategori Berita Bawaan (DIUBAH KE firstOrCreate)
        $kategori = ['Pemerintahan', 'Kegiatan Desa', 'UMKM', 'Pendidikan', 'Kesehatan'];
        foreach ($kategori as $kat) {
            Category::firstOrCreate(
                ['slug' => Str::slug($kat)],
                ['nama' => $kat]
            );
        }

        // 4. Buat Contoh Data Dusun (Bisa pakai firstOrCreate juga biar aman)
        Dusun::firstOrCreate(
            ['nama_dusun' => 'Dusun Krajan'],
            [
                'nama_kepala_dusun' => 'Bapak Fulan',
                'jumlah_penduduk' => 450,
            ]
        );
    }
}