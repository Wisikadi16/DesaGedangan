<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('layanan_smards', function (Blueprint $table) {
            $table->id();
            $table->string('judul')->default('LAYANAN DESA DENGAN APLIKASI SMARD');
            $table->text('sub_judul')->nullable(); // Contoh: SMARD (Sistem Informasi Manajemen Administrasi Desa)...
            $table->longText('paragraf_utama')->nullable(); // Paragraf penjelasan
            $table->longText('tujuan_poin')->nullable(); // Daftar poin tujuan (per baris/enter)
            $table->string('gambar')->nullable(); // Untuk upload screenshot aplikasi SMARD
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('layanan_smards');
    }
};