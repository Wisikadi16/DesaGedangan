<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->date('tanggal')->nullable()->after('user_id'); // Menambah kolom tanggal
            $table->string('gambar')->nullable()->after('tanggal'); // Menambah kolom gambar
        });
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn(['tanggal', 'gambar']);
        });
    }
};