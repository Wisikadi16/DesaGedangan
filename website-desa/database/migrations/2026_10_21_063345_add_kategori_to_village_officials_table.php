<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('village_officials', function (Blueprint $table) {
            if (!Schema::hasColumn('village_officials', 'kategori')) {
                $table->string('kategori')->default('Perangkat Desa')->after('id');
            }
            if (!Schema::hasColumn('village_officials', 'urutan')) {
                $table->integer('urutan')->default(0)->after('jabatan');
            }
        });
    }

    public function down(): void
    {
        Schema::table('village_officials', function (Blueprint $table) {
            $table->dropColumn(['kategori', 'urutan']);
        });
    }
};