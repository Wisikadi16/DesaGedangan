<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('village_profiles', function (Blueprint $table) {
            if (!Schema::hasColumn('village_profiles', 'letak_geografis')) {
                $table->string('letak_geografis')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'ketinggian')) {
                $table->string('ketinggian')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'batas_utara')) {
                $table->string('batas_utara')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'batas_selatan')) {
                $table->string('batas_selatan')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'batas_timur')) {
                $table->string('batas_timur')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'batas_barat')) {
                $table->string('batas_barat')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'iklim')) {
                $table->string('iklim')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'suhu')) {
                $table->string('suhu')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'curah_hujan')) {
                $table->string('curah_hujan')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'kelembaban')) {
                $table->string('kelembaban')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'luas_datar')) {
                $table->string('luas_datar')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'luas_pegunungan')) {
                $table->string('luas_pegunungan')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'sawah_irigasi')) {
                $table->string('sawah_irigasi')->nullable();
            }
            if (!Schema::hasColumn('village_profiles', 'pemukiman')) {
                $table->string('pemukiman')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('village_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'letak_geografis', 'ketinggian', 'batas_utara', 'batas_selatan', 
                'batas_timur', 'batas_barat', 'iklim', 'suhu', 'curah_hujan', 
                'kelembaban', 'luas_datar', 'luas_pegunungan', 'sawah_irigasi', 'pemukiman'
            ]);
        });
    }
};