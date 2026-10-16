<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('syarat_pelayanans', function (Blueprint $table) {
            $table->id();
            $table->string('judul_layanan'); // Contoh: KARTU KELUARGA (KSK)
            $table->string('ikon')->default('📄'); // Emoji atau ikon
            $table->longText('daftar_syarat'); // Disimpan per baris (tiap baris 1 syarat)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('syarat_pelayanans');
    }
};