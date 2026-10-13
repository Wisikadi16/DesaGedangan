<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Kolom tambahan untuk halaman Kondisi Umum, Profil Penduduk, serta Potensi & Masalah.
     */
    public function up(): void
    {
        Schema::table('village_profiles', function (Blueprint $table) {
            // Kondisi umum
            $table->string('luas_wilayah')->nullable()->after('longitude');
            $table->string('batas_utara')->nullable()->after('luas_wilayah');
            $table->string('batas_selatan')->nullable()->after('batas_utara');
            $table->string('batas_timur')->nullable()->after('batas_selatan');
            $table->string('batas_barat')->nullable()->after('batas_timur');
            $table->text('kondisi_umum')->nullable()->after('batas_barat');

            // Kependudukan (rincian per dusun diambil dari tabel dusuns)
            $table->unsignedInteger('jumlah_laki_laki')->default(0)->after('kondisi_umum');
            $table->unsignedInteger('jumlah_perempuan')->default(0)->after('jumlah_laki_laki');
            $table->unsignedInteger('jumlah_kk')->default(0)->after('jumlah_perempuan');

            // Potensi & masalah
            $table->text('potensi')->nullable()->after('jumlah_kk');
            $table->text('masalah')->nullable()->after('potensi');
        });
    }

    public function down(): void
    {
        Schema::table('village_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'luas_wilayah', 'batas_utara', 'batas_selatan', 'batas_timur', 'batas_barat',
                'kondisi_umum', 'jumlah_laki_laki', 'jumlah_perempuan', 'jumlah_kk',
                'potensi', 'masalah',
            ]);
        });
    }
};
