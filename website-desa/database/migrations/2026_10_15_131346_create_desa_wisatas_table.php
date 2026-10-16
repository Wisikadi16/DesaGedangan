<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('desa_wisatas', function (Blueprint $table) {
            $table->id();
            // Kolom untuk profil utama/artikel panjang di atas
            $table->longText('narasi_utama')->nullable(); 
            
            // Kolom untuk masing-masing Tab
            $table->longText('visi_misi')->nullable();
            $table->longText('sarana')->nullable();
            $table->longText('obyek_wisata')->nullable();
            $table->longText('kuliner_ndeso')->nullable();
            $table->longText('even')->nullable();
            $table->longText('info_paket')->nullable();
            $table->longText('pokdarwis')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('desa_wisatas');
    }
};