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
        // 1. Buat / Perbarui Akun Admin Desa
        User::updateOrCreate(
            ['email' => 'admin@gedangan.desa.id'],
            [
                'name' => 'Admin Desa Gedangan', 
                'password' => Hash::make('DesaGedangan2026')
            ]
        );

        $this->command?->info("Akun admin siap -> email: admin@gedangan.desa.id | password: DesaGedangan2026");

        // 2. Buat Profil Desa Default
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
                'sejarah' => "Gedangan adalah sebuah nama salah satu desa yang terletak di kecamatan Tuntang, kabupaten Semarang. Desa Gedangan terletak di tengah-tengah kawasan kaki gunung Merbabu dan daerah sekitar Rawa Pening.\n\nSeiring perkembangan zaman, diadakan penggabungan dengan dusun Bandungan, sebuah dusun yang bersebelahan dengan Gedangan, hingga akhirnya sah menjadi nama Desa Gedangan.",
                'visi' => "DALAM KEBERSAMAAN MEMBANGUN MASYARAKAT DESA GEDANGAN SEUTUHNYA",
                'misi' => "1. Meningkatkan pelayanan publik yang transparan dan cepat.\n2. Mengembangkan potensi pertanian dan ekonomi kerakyatan.",
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
            ['nama_dusun' => 'Bandungan', 'nama_kepala_dusun' => 'M. Zaenal Arifin', 'jumlah_penduduk' => 0],
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

        // 5. Data Perangkat Desa
        $perangkatDesa = [
            ['jabatan' => 'Kepala Desa', 'nama' => 'DAROJI', 'alamat' => 'KARANGNONGKO', 'kategori' => 'Perangkat Desa', 'urutan' => 1],
            ['jabatan' => 'Sekretaris Desa', 'nama' => 'BEKTI HENDINIK, S.T', 'alamat' => 'GEDANGAN', 'kategori' => 'Perangkat Desa', 'urutan' => 2],
            ['jabatan' => 'Kaur Umum', 'nama' => 'LASTRI', 'alamat' => 'BANDUNGAN', 'kategori' => 'Perangkat Desa', 'urutan' => 3],
            ['jabatan' => 'Kaur Keuangan', 'nama' => 'WINARNO', 'alamat' => 'DEMPEL', 'kategori' => 'Perangkat Desa', 'urutan' => 4],
            ['jabatan' => 'Kasi Pemerintahan', 'nama' => 'ROHID HAMDANI, AMd', 'alamat' => 'PADAAN', 'kategori' => 'Perangkat Desa', 'urutan' => 5],
            ['jabatan' => 'Kasi Kesejahteraan', 'nama' => 'ARIF S. HIDAYAT A.Md', 'alamat' => 'DEMPEL', 'kategori' => 'Perangkat Desa', 'urutan' => 6],
            ['jabatan' => 'Kasi Pelayanan', 'nama' => 'MUSTABIQOTUL KH, A,Md', 'alamat' => 'DEMPEL', 'kategori' => 'Perangkat Desa', 'urutan' => 7],
            ['jabatan' => 'Kadus Bandungan', 'nama' => 'M. ZAENAL ARIFIN', 'alamat' => 'BANDUNGAN', 'kategori' => 'Perangkat Desa', 'urutan' => 8],
            ['jabatan' => 'Kadus Jaten', 'nama' => 'AHMAD KUSERI', 'alamat' => 'JATEN', 'kategori' => 'Perangkat Desa', 'urutan' => 9],
            ['jabatan' => 'Kadus Bendo', 'nama' => 'IMAM SANTOSO, S.E', 'alamat' => 'BENDO', 'kategori' => 'Perangkat Desa', 'urutan' => 10],
            ['jabatan' => 'Kadus Dempel', 'nama' => 'HERU SISWANTO', 'alamat' => 'DEMPEL', 'kategori' => 'Perangkat Desa', 'urutan' => 11],
            ['jabatan' => 'Kadus Karangnongko', 'nama' => 'MUBTADIUL HADZIQ', 'alamat' => 'KARANGNONGKO', 'kategori' => 'Perangkat Desa', 'urutan' => 12],
            ['jabatan' => 'Kadus Gedangan', 'nama' => 'NITA PRASTYOWATI', 'alamat' => 'GEDANGAN', 'kategori' => 'Perangkat Desa', 'urutan' => 13],
            ['jabatan' => 'Kadus Padaan', 'nama' => 'MUHAMAD FATONI', 'alamat' => 'PADAAN', 'kategori' => 'Perangkat Desa', 'urutan' => 14],
            ['jabatan' => 'Staf Teknis', 'nama' => 'WACHID NURYADI', 'alamat' => 'BANDUNGAN', 'kategori' => 'Perangkat Desa', 'urutan' => 15],
            ['jabatan' => 'Staf Kebersihan', 'nama' => 'AGUS RIWAYADI', 'alamat' => 'BANDUNGAN', 'kategori' => 'Perangkat Desa', 'urutan' => 16],
        ];

        foreach ($perangkatDesa as $p) {
            VillageOfficial::firstOrCreate(
                ['nama' => $p['nama'], 'kategori' => 'Perangkat Desa'],
                $p
            );
        }

        // 6. Data BPD
        $bpdData = [
            ['jabatan' => 'Ketua', 'nama' => 'AGUS JOKO WAHONO, S.M', 'alamat' => 'DEMPEL', 'kategori' => 'BPD', 'urutan' => 1],
            ['jabatan' => 'Wakil Ketua', 'nama' => 'M. RIFAN SALIS', 'alamat' => 'GEDANGAN', 'kategori' => 'BPD', 'urutan' => 2],
            ['jabatan' => 'Sekretaris', 'nama' => 'WIWIN ARININGSIH, SH', 'alamat' => 'KARANGNONGKO', 'kategori' => 'BPD', 'urutan' => 3],
            ['jabatan' => 'Bendahara', 'nama' => 'DWI PARWANTI', 'alamat' => 'JATEN', 'kategori' => 'BPD', 'urutan' => 4],
            ['jabatan' => 'Anggota', 'nama' => 'ZULFA ALI MAKHRUS', 'alamat' => 'BANDUNGAN', 'kategori' => 'BPD', 'urutan' => 5],
            ['jabatan' => 'Anggota', 'nama' => 'SLAMET KUWAT', 'alamat' => 'BENDO', 'kategori' => 'BPD', 'urutan' => 6],
        ];

        foreach ($bpdData as $bpd) {
            VillageOfficial::firstOrCreate(
                ['nama' => $bpd['nama'], 'kategori' => 'BPD'],
                $bpd
            );
        }

        // 7. Data LKMD
        $lkmdData = [
            ['jabatan' => 'Ketua Umum LPMD', 'nama' => 'DARMUJI', 'alamat' => 'Padaan', 'kategori' => 'LKMD', 'urutan' => 1],
            ['jabatan' => 'Ketua I', 'nama' => 'BUDIYANTO', 'alamat' => 'Bandungan', 'kategori' => 'LKMD', 'urutan' => 2],
            ['jabatan' => 'Ketua II', 'nama' => 'SUYADI', 'alamat' => 'Gedangan', 'kategori' => 'LKMD', 'urutan' => 3],
            ['jabatan' => 'Sekretaris', 'nama' => 'GIGIH AJI SETIYONO', 'alamat' => 'Karangnongko', 'kategori' => 'LKMD', 'urutan' => 4],
            ['jabatan' => 'Bendahara', 'nama' => 'SITI MUTMAINAH', 'alamat' => 'Bandungan', 'kategori' => 'LKMD', 'urutan' => 5],
            ['jabatan' => 'Anggota', 'nama' => 'MAS\'UD', 'alamat' => 'Dempel', 'kategori' => 'LKMD', 'urutan' => 6],
            ['jabatan' => 'Anggota', 'nama' => 'SITI ASMANAH', 'alamat' => 'Karangnongko', 'kategori' => 'LKMD', 'urutan' => 7],
            ['jabatan' => 'Anggota', 'nama' => 'SUTRISNO', 'alamat' => 'Dempel', 'kategori' => 'LKMD', 'urutan' => 8],
            ['jabatan' => 'Anggota', 'nama' => 'SUWARNO', 'alamat' => 'Bandungan', 'kategori' => 'LKMD', 'urutan' => 9],
            ['jabatan' => 'Anggota', 'nama' => 'JOKO SARONO', 'alamat' => 'Bandungan', 'kategori' => 'LKMD', 'urutan' => 10],
            ['jabatan' => 'Anggota', 'nama' => 'H. JUNAEDI', 'alamat' => 'Bandungan', 'kategori' => 'LKMD', 'urutan' => 11],
            ['jabatan' => 'Anggota', 'nama' => 'KASTOMO', 'alamat' => 'Padaan', 'kategori' => 'LKMD', 'urutan' => 12],
            ['jabatan' => 'Anggota', 'nama' => 'FAJRIYAH', 'alamat' => 'Padaan', 'kategori' => 'LKMD', 'urutan' => 13],
        ];

        foreach ($lkmdData as $lkmd) {
            VillageOfficial::firstOrCreate(
                ['nama' => $lkmd['nama'], 'kategori' => 'LKMD'],
                $lkmd
            );
        }

        // 8. Data TPK & KPMD
        $tpkData = [
            ['jabatan' => 'Ketua', 'nama' => 'HERU SISWANTO', 'alamat' => 'DEMPEL', 'kategori' => 'TPK/KPMD', 'urutan' => 1],
            ['jabatan' => 'Sekretaris', 'nama' => 'WACHID NURYADI', 'alamat' => 'BANDUNGAN', 'kategori' => 'TPK/KPMD', 'urutan' => 2],
            ['jabatan' => 'Anggota', 'nama' => 'BUDIYONO', 'alamat' => 'BENDO', 'kategori' => 'TPK/KPMD', 'urutan' => 3],
            ['jabatan' => 'Anggota', 'nama' => 'AGUS RIWAYADI', 'alamat' => 'BANDUNGAN', 'kategori' => 'TPK/KPMD', 'urutan' => 4],
            ['jabatan' => 'Anggota', 'nama' => 'SUPARYANTO', 'alamat' => 'KARANGNONGKO', 'kategori' => 'TPK/KPMD', 'urutan' => 5],
        ];

        foreach ($tpkData as $tpk) {
            VillageOfficial::firstOrCreate(
                ['nama' => $tpk['nama'], 'kategori' => 'TPK/KPMD'],
                $tpk
            );
        }

        // 9. Data PKK (Sesuai Arsip Resmi)
        $pkkData = [
            ['jabatan' => 'Pelindung', 'nama' => 'KEPALA DESA', 'alamat' => 'Karangnongko', 'kategori' => 'PKK', 'urutan' => 1],
            ['jabatan' => 'Ketua', 'nama' => 'SITI ASMANAH', 'alamat' => 'Karangnongko', 'kategori' => 'PKK', 'urutan' => 2],
            ['jabatan' => 'Sekretaris', 'nama' => 'DEASY ANGGRAINI', 'alamat' => '-', 'kategori' => 'PKK', 'urutan' => 3],
            ['jabatan' => 'Bendahara', 'nama' => 'LASTRI', 'alamat' => 'Bandungan', 'kategori' => 'PKK', 'urutan' => 4],
            ['jabatan' => 'Anggota', 'nama' => 'Seluruh Ibu Warga Desa Gedangan', 'alamat' => '-', 'kategori' => 'PKK', 'urutan' => 5],
        ];

        foreach ($pkkData as $pkk) {
            VillageOfficial::firstOrCreate(
                ['nama' => $pkk['nama'], 'kategori' => 'PKK'],
                $pkk
            );
        }

        // 10. Data RT / RW
        $rtRwData = [
            ['jabatan' => 'KETUA RW', 'nama' => 'SUWARNO', 'alamat' => 'RW 1 BANDUNGAN', 'kategori' => 'RT/RW', 'urutan' => 1],
            ['jabatan' => 'KETUA RT 1', 'nama' => 'SUTRISNO', 'alamat' => 'RW 1 BANDUNGAN', 'kategori' => 'RT/RW', 'urutan' => 2],
            ['jabatan' => 'KETUA RT 2', 'nama' => 'MUNAWIR', 'alamat' => 'RW 1 BANDUNGAN', 'kategori' => 'RT/RW', 'urutan' => 3],
            ['jabatan' => 'KETUA RT 3', 'nama' => 'SUMHURI', 'alamat' => 'RW 1 BANDUNGAN', 'kategori' => 'RT/RW', 'urutan' => 4],
            ['jabatan' => 'KETUA RT 4', 'nama' => 'JUMADI', 'alamat' => 'RW 1 BANDUNGAN', 'kategori' => 'RT/RW', 'urutan' => 5],
            ['jabatan' => 'KETUA RT 5', 'nama' => 'TARWI', 'alamat' => 'RW 1 BANDUNGAN', 'kategori' => 'RT/RW', 'urutan' => 6],
            ['jabatan' => 'KETUA RT 6', 'nama' => 'M. ABADI', 'alamat' => 'RW 1 BANDUNGAN', 'kategori' => 'RT/RW', 'urutan' => 7],
            
            ['jabatan' => 'KETUA RW', 'nama' => 'SUPARTIN', 'alamat' => 'RW 2 JATEN', 'kategori' => 'RT/RW', 'urutan' => 8],
            ['jabatan' => 'KETUA RT 1', 'nama' => 'SISWANTO', 'alamat' => 'RW 2 JATEN', 'kategori' => 'RT/RW', 'urutan' => 9],
            ['jabatan' => 'KETUA RT 2', 'nama' => 'PURWADI', 'alamat' => 'RW 2 JATEN', 'kategori' => 'RT/RW', 'urutan' => 10],
            ['jabatan' => 'KETUA RT 3', 'nama' => 'MUHLASIN', 'alamat' => 'RW 2 JATEN', 'kategori' => 'RT/RW', 'urutan' => 11],
            ['jabatan' => 'KETUA RT 4', 'nama' => 'NGADIYONO', 'alamat' => 'RW 2 JATEN', 'kategori' => 'RT/RW', 'urutan' => 12],

            ['jabatan' => 'KETUA RW', 'nama' => 'BUDIYONO', 'alamat' => 'RW 3 BENDO', 'kategori' => 'RT/RW', 'urutan' => 13],
            ['jabatan' => 'KETUA RT 1', 'nama' => 'SLAMET', 'alamat' => 'RW 3 BENDO', 'kategori' => 'RT/RW', 'urutan' => 14],
            ['jabatan' => 'KETUA RT 2', 'nama' => 'M. ARIFIN', 'alamat' => 'RW 3 BENDO', 'kategori' => 'RT/RW', 'urutan' => 15],
            ['jabatan' => 'KETUA RT 3', 'nama' => 'MUHTAROM', 'alamat' => 'RW 3 BENDO', 'kategori' => 'RT/RW', 'urutan' => 16],
            ['jabatan' => 'KETUA RT 4', 'nama' => 'SOIMIN', 'alamat' => 'RW 3 BENDO', 'kategori' => 'RT/RW', 'urutan' => 17],

            ['jabatan' => 'KETUA RW', 'nama' => 'MADIYO', 'alamat' => 'RW 4 DEMPEL', 'kategori' => 'RT/RW', 'urutan' => 18],
            ['jabatan' => 'KETUA RT 1', 'nama' => 'ZAEDI', 'alamat' => 'RW 4 DEMPEL', 'kategori' => 'RT/RW', 'urutan' => 19],
            ['jabatan' => 'KETUA RT 2', 'nama' => 'NGATNO', 'alamat' => 'RW 4 DEMPEL', 'kategori' => 'RT/RW', 'urutan' => 20],
            ['jabatan' => 'KETUA RT 3', 'nama' => 'MUNDAKIR', 'alamat' => 'RW 4 DEMPEL', 'kategori' => 'RT/RW', 'urutan' => 21],

            ['jabatan' => 'KETUA RW', 'nama' => 'HARIYANTO', 'alamat' => 'RW 5 KARANGNONGKO', 'kategori' => 'RT/RW', 'urutan' => 22],
            ['jabatan' => 'KETUA RT 1', 'nama' => 'SLAMET PURWANTO', 'alamat' => 'RW 5 KARANGNONGKO', 'kategori' => 'RT/RW', 'urutan' => 23],
            ['jabatan' => 'KETUA RT 2', 'nama' => 'HADI SUSANTO', 'alamat' => 'RW 5 KARANGNONGKO', 'kategori' => 'RT/RW', 'urutan' => 24],
            ['jabatan' => 'KETUA RT 3', 'nama' => 'PURWANTO', 'alamat' => 'RW 5 KARANGNONGKO', 'kategori' => 'RT/RW', 'urutan' => 25],

            ['jabatan' => 'KETUA RW', 'nama' => 'SUTARJO', 'alamat' => 'RW 6 GEDANGAN', 'kategori' => 'RT/RW', 'urutan' => 26],
            ['jabatan' => 'KETUA RT 1', 'nama' => 'H. ANAS ASNAWI', 'alamat' => 'RW 6 GEDANGAN', 'kategori' => 'RT/RW', 'urutan' => 27],
            ['jabatan' => 'KETUA RT 2', 'nama' => 'H. ABDUL SALAM', 'alamat' => 'RW 6 GEDANGAN', 'kategori' => 'RT/RW', 'urutan' => 28],
            ['jabatan' => 'KETUA RT 3', 'nama' => 'DJIMIN', 'alamat' => 'RW 6 GEDANGAN', 'kategori' => 'RT/RW', 'urutan' => 29],
            ['jabatan' => 'KETUA RT 4', 'nama' => 'SUPARMAN', 'alamat' => 'RW 6 GEDANGAN', 'kategori' => 'RT/RW', 'urutan' => 30],

            ['jabatan' => 'KETUA RW', 'nama' => 'CHABIB M.', 'alamat' => 'RW 7 PADAAN', 'kategori' => 'RT/RW', 'urutan' => 31],
            ['jabatan' => 'KETUA RT 1', 'nama' => 'ABU KHAMID', 'alamat' => 'RW 7 PADAAN', 'kategori' => 'RT/RW', 'urutan' => 32],
            ['jabatan' => 'KETUA RT 2', 'nama' => 'ROHID HAMDANI', 'alamat' => 'RW 7 PADAAN', 'kategori' => 'RT/RW', 'urutan' => 33],
            ['jabatan' => 'KETUA RT 3', 'nama' => 'AHMAD SHOIR', 'alamat' => 'RW 7 PADAAN', 'kategori' => 'RT/RW', 'urutan' => 34],
            ['jabatan' => 'KETUA RT 4', 'nama' => 'BAYU YUNANTO', 'alamat' => 'RW 7 PADAAN', 'kategori' => 'RT/RW', 'urutan' => 35],
        ];

        foreach ($rtRwData as $rtrw) {
            VillageOfficial::firstOrCreate(
                ['nama' => $rtrw['nama'], 'kategori' => 'RT/RW', 'alamat' => $rtrw['alamat']],
                $rtrw
            );
        }
    }
}