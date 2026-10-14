<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('village_profiles', function (Blueprint $table) {
            $table->json('kelompok_umur')->nullable();
            $table->json('pekerjaan')->nullable();
            $table->json('agama')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('village_profiles', function (Blueprint $table) {
            $table->dropColumn(['kelompok_umur', 'pekerjaan', 'agama']);
        });
    }
};