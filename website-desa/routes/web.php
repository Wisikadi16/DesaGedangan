<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\VillageProfile;
use App\Models\News;
use App\Http\Controllers\Admin\UmkmController;

// ==============================================================
// 1. HALAMAN PUBLIK (Beranda Utama)
// ==============================================================
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'profil' => VillageProfile::first(),
        'berita' => News::with('category')->latest()->take(3)->get() // Ambil 3 berita terbaru
    ]);
})->name('home');

// ==============================================================
// 2. RUTE HALAMAN KOSONGAN (Sesuai Navbar)
// ==============================================================
// Profil
Route::get('/profil/desa', fn() => Inertia::render('Blank', ['title' => 'Profil Desa']))->name('profil.desa');
Route::get('/profil/pemerintahan', fn() => Inertia::render('Blank', ['title' => 'Pemerintahan']))->name('profil.pemerintahan');
Route::get('/profil/kondisi-umum', fn() => Inertia::render('Blank', ['title' => 'Kondisi Umum']))->name('profil.kondisi');
Route::get('/profil/penduduk', fn() => Inertia::render('Blank', ['title' => 'Profil Penduduk']))->name('profil.penduduk');
Route::get('/profil/potensi-masalah', fn() => Inertia::render('Blank', ['title' => 'Potensi dan Masalah']))->name('profil.masalah');
Route::get('/profil/dusun', fn() => Inertia::render('Blank', ['title' => 'Data 7 Dusun (Bandungan, Jaten, Bendo, dll)']))->name('profil.dusun');

// Berita & Wisata
Route::get('/berita', fn() => Inertia::render('Blank', ['title' => 'Arsip Berita & Transparansi']))->name('berita');
Route::get('/desa-wisata', fn() => Inertia::render('Blank', ['title' => 'Desa Wisata & Peta Wisata']))->name('wisata');

// Potensi
Route::get('/potensi/pariwisata', fn() => Inertia::render('Blank', ['title' => 'Potensi Pariwisata']))->name('potensi.pariwisata');
Route::get('/potensi/pasar-desa', fn() => Inertia::render('Blank', ['title' => 'Pasar Desa']))->name('potensi.pasar');
Route::get('/potensi/kesenian', fn() => Inertia::render('Blank', ['title' => 'Kesenian Daerah']))->name('potensi.kesenian');

// Transparansi
Route::get('/transparansi/apbdes', fn() => Inertia::render('Blank', ['title' => 'Laporan APBDes']))->name('transparansi.apbdes');
Route::get('/transparansi/realisasi', fn() => Inertia::render('Blank', ['title' => 'Realisasi Anggaran']))->name('transparansi.realisasi');

// Desa Online
Route::get('/desa-online/syarat', fn() => Inertia::render('Blank', ['title' => 'Syarat Pelayanan']))->name('online.syarat');
Route::get('/desa-online/smard', fn() => Inertia::render('Blank', ['title' => 'Layanan Berbasis SMARD']))->name('online.smard');

// Kontak
Route::get('/buku-tamu', fn() => Inertia::render('Blank', ['title' => 'Buku Tamu']))->name('buku-tamu');
Route::get('/kontak', fn() => Inertia::render('Blank', ['title' => 'Kontak Kami']))->name('kontak');

//UMKM
Route::get('/umkm', [\App\Http\Controllers\Admin\UmkmController::class, 'publicIndex'])->name('umkm.index');

// ==============================================================
// 3. HALAMAN ADMIN (Khusus Perangkat Desa, Wajib Login)
// ==============================================================
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Rute Manual Berita (Urutan aman: Statis di atas, Dinamis {id} di bawah)
    Route::get('/berita', [App\Http\Controllers\Admin\BeritaController::class, 'index'])->name('berita.index');
    Route::get('/berita/tambah', [App\Http\Controllers\Admin\BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [App\Http\Controllers\Admin\BeritaController::class, 'store'])->name('berita.store');
    Route::get('/berita/{id}/edit', [App\Http\Controllers\Admin\BeritaController::class, 'edit'])->name('berita.edit');
    Route::put('/berita/{id}', [App\Http\Controllers\Admin\BeritaController::class, 'update'])->name('berita.update');
    Route::delete('/berita/{id}', [App\Http\Controllers\Admin\BeritaController::class, 'destroy'])->name('berita.destroy');

    // Resource lain tetap aman
    Route::resource('/umkm', \App\Http\Controllers\Admin\UmkmController::class);
    Route::resource('/profil', \App\Http\Controllers\Admin\ProfilController::class);
});


Route::get('/umkm', [App\Http\Controllers\Admin\UmkmController::class, 'publicIndex'])->name('umkm.index');


// Bawaan sistem login Laravel
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';