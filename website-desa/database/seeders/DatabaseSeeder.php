<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\VillageProfile;
use App\Models\Category;
use App\Models\Dusun;
use App\Models\VillageOfficial;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat / Perbarui Akun Admin Desa (Password Permanen)
        $admin = User::updateOrCreate(
            ['email' => 'admin@gedangan.desa.id'],
            [
                'name' => 'Admin Desa Gedangan', 
                'password' => Hash::make('DesaGedangan2026')
            ]
        );

        $this->command?->info("Akun admin siap -> email: admin@gedangan.desa.id | password: DesaGedangan2026");

        // 2. Buat Profil Desa Default (Lengkap dengan Sejarah, Visi, & Misi Desa)
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
                
                'visi' => "DALAM KEBERSAMAAN MEMBANGUN MASYARAKAT DESA GEDANGAN SEUTUHNYA\n\n" .
                          "NILAI-NILAI YANG MELANDASI VISI:\n" .
                          "- Desa Gedangan mempunyai sumber daya yang ada cukup memadai, hanya saja penanganannya kurang maksimal.\n" .
                          "- Sebagian besar warga adalah petani dan buruh industri, jadi mereka merupakan potensi desa yang tak ternilai harganya.\n\n" .
                          "MAKNA YANG TERKANDUNG DALAM VISI:\n" .
                          "- Kebersamaan: Dalam melaksanakan semua kegiatan yang telah diprogramkan, selalu dilakukan dengan melibatkan semua unsur masyarakat yang ada di desa Gedangan.\n" .
                          "- Membangun: Mengadakan sesuatu yang sebelumnya tidak ada, melestarikan, merawat dan membuat sesuatu menjadi semakin baik.\n" .
                          "- Masyarakat: Sekelompok orang atau warga yang ada disuatu daerah yang menjadi salah satu unsur adanya suatu desa.\n" .
                          "- Desa Gedangan: Adalah satu kesatuan masyarakat hukum dengan segala potensinya dalam sistem pemerintahan di wilayah Desa Gedangan.\n" .
                          "- Seutuhnya: Keseluruhan dari aspek yang ada dengan tidak meninggalkan unsur manapun.",

                'misi' => "BIDANG PEMERINTAHAN:\n" .
                          "1. Bersama lembaga Desa melakukan evaluasi program Pemerintah Desa setiap bulan.\n" .
                          "2. Memberikan kemudahan kepada masyarakat dalam setiap pelayanan.\n" .
                          "3. Tertib administrasi.\n" .
                          "4. Peningkatan Sumber Daya Manusia.\n\n" .
                          
                          "BIDANG PERTANIAN DAN PETERNAKAN:\n" .
                          "1. Pemberdayaan Kelompok Tani.\n" .
                          "2. Pengadaan sarana dan Prasarana Pertanian.\n" .
                          "3. Perawatan sarana dan Prasarana Irigasi.\n" .
                          "4. Mengikutsertakan warga dalam pelatihan.\n\n" .
                          
                          "BIDANG EKONOMI:\n" .
                          "1. Peningkatan Pengembangan lembaga keuangan desa.\n" .
                          "2. Peningkatan dan pemberdayaan koperasi.\n" .
                          "3. Pembinaan Industri kecil.\n\n" .
                          
                          "BIDANG PENDIDIKAN:\n" .
                          "- Memberikan dorongan moril dan materiil dalam pengembangan pendidikan swasta.\n\n" .
                          
                          "BIDANG AGAMA:\n" .
                          "1. Menjaga sinergis kerukunan umat beragama.\n" .
                          "2. Memberikan kebebasan umat beragama dalam menjalankan ibadah sesuai dengan agamanya.\n\n" .
                          
                          "BIDANG SOSIAL:\n" .
                          "- Meningkatkan kepedulian terhadap warga dalam segala kondisi.\n\n" .
                          
                          "BIDANG SENI BUDAYA:\n" .
                          "1. Memberikan dukungan untuk pelestarian kesenian daerah.\n" .
                          "2. Memberikan dukungan terhadap pelaksanaan adat desa.\n\n" .
                          
                          "PEMBANGUNAN FISIK:\n" .
                          "- Melaksanakan Pembangunan sesuai RPJMDes.",
            ]
        );

        // 3. Buat Kategori Berita Bawaan
        $kategori = ['Pemerintahan', 'Kegiatan Desa', 'UMKM', 'Pendidikan', 'Kesehatan'];
        foreach ($kategori as $kat) {
            Category::firstOrCreate(
                ['slug' => Str::slug($kat)],
                ['nama' => $kat]
            );
        }

        // 4. Buat Data Dusun
        $dusuns = [
            ['nama_dusun' => 'Dusun Krajan', 'nama_kepala_dusun' => 'Bapak Fulan', 'jumlah_penduduk' => 450],
            ['nama_dusun' => 'Bandongan', 'nama_kepala_dusun' => 'M. Zaenal Arifin', 'jumlah_penduduk' => 0],
            ['nama_dusun' => 'Jaten', 'nama_kepala_dusun' => 'Ahmad Kuseri', 'jumlah_penduduk' => 0],
            ['nama_dusun' => 'Bendo', 'nama_kepala_dusun' => 'Imam Santoso, S.E', 'jumlah_penduduk' => 0],
            ['nama_dusun' => 'Dempel', 'nama_kepala_dusun' => 'Heru Siswanto', 'jumlah_penduduk' => 0],
            ['nama_dusun' => 'Karangnongko', 'nama_kepala_dusun' => 'Mubtadiul Hadziq', 'jumlah_penduduk' => 0],
            ['nama_dusun' => 'Gedangan', 'nama_kepala_dusun' => 'Nita Prastyowati', 'jumlah_penduduk' => 0],
            ['nama_dusun' => 'Padaan', 'nama_kepala_dusun' => 'Muhamad Fatoni', 'jumlah_penduduk' => 0],
        ];

        foreach ($dusuns as $dusun) {
            Dusun::firstOrCreate(
                ['nama_dusun' => $dusun['nama_dusun']],
                [
                    'nama_kepala_dusun' => $dusun['nama_kepala_dusun'],
                    'jumlah_penduduk' => $dusun['jumlah_penduduk'],
                ]
            );
        }

        // 5. Masukkan Data Perangkat Desa (Tanpa kolom 'alamat' yang tidak ada di tabel)
        $perangkatDesa = [
            ['jabatan' => 'Kepala Desa', 'nama' => 'DAROJI'],
            ['jabatan' => 'Sekretaris Desa', 'nama' => 'BEKTI HENDINIK, S.T'],
            ['jabatan' => 'Kaur Umum', 'nama' => 'LASTRI'],
            ['jabatan' => 'Kaur Keuangan', 'nama' => 'WINARNO'],
            ['jabatan' => 'Kasi Pemerintahan', 'nama' => 'ROHID HAMDANI, AMd'],
            ['jabatan' => 'Kasi Kesejahteraan', 'nama' => 'ARIF S. HIDAYAT A.Md'],
            ['jabatan' => 'Kasi Pelayanan', 'nama' => 'MUSTABIQOTUL KH, A,Md'],
            ['jabatan' => 'Kadus Bandongan', 'nama' => 'M. ZAENAL ARIFIN'],
            ['jabatan' => 'Kadus Jaten', 'nama' => 'AHMAD KUSERI'],
            ['jabatan' => 'Kadus Bendo', 'nama' => 'IMAM SANTOSO, S.E'],
            ['jabatan' => 'Kadus Dempel', 'nama' => 'HERU SISWANTO'],
            ['jabatan' => 'Kadus Karangnongko', 'nama' => 'MUBTADIUL HADZIQ'],
            ['jabatan' => 'Kadus Gedangan', 'nama' => 'NITA PRASTYOWATI'],
            ['jabatan' => 'Kadus Padaan', 'nama' => 'MUHAMAD FATONI'],
            ['jabatan' => 'Staf Teknis', 'nama' => 'WACHID NURYADI'],
            ['jabatan' => 'Staf Kebersihan', 'nama' => 'AGUS RIWAYADI'],
        ];

        foreach ($perangkatDesa as $p) {
            VillageOfficial::firstOrCreate(
                ['jabatan' => $p['jabatan'], 'nama' => $p['nama']]
            );
        }
    }
}