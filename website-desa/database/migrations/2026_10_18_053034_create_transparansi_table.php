<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tetap pakai nama tabel 'transparansi'
        Schema::create('transparansi', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->year('tahun')->nullable(); // Disinkronkan
            $table->string('kategori')->default('Umum');
            $table->date('tanggal')->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('gambar')->nullable(); // Tambahan biar sinkron sama Model
            $table->string('file_lampiran')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transparansi');
    }
};