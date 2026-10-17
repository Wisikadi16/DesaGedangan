<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('potensi_desas', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->enum('kategori', ['Pariwisata', 'Pasar Desa', 'Kesenian']);
            $table->longText('konten');
            $table->string('gambar')->nullable();
            $table->date('tanggal');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('potensi_desas');
    }
};