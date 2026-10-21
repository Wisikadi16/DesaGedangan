<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lembaga_desas', function (Blueprint $table) {
            $table->id();
            $table->string('kategori'); // Isinya: BPD, LKMD, TPK, KPMD, PKK, RT_RW, ORMAS
            $table->string('jabatan')->nullable();
            $table->string('nama');
            $table->string('alamat_atau_keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lembaga_desas');
    }
};