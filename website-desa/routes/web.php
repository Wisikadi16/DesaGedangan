<?php

use App\Http\Controllers\Admin\BeritaController;
use App\Http\Controllers\Admin\DusunController;
use App\Http\Controllers\Admin\PerangkatController;
use App\Http\Controllers\Admin\ProfilController;
use App\Http\Controllers\Admin\UmkmController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilPublikController;
use App\Models\News;
use App\Models\VillageProfile;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. HALAMAN BERANDA
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'profil' => VillageProfile::first(),
        'berita' => News::with('category')->where('status', 'published')->latest('tanggal')->take(3)->get(),
    ]);
})->name('home');

// 2. HALAMAN PROFIL (Satu halaman panjang untuk di-scroll)
Route::get('/profil', [ProfilPublikController::class, 'index'])->name('profil.index');

// Berita, Wisata, Potensi, Transparansi, dll (Tetap)
Route::get('/berita', [BeritaController::class, 'publicIndex'])->name('berita');
Route::get('/berita/{id}', [BeritaController::class, 'show'])->whereNumber('id')->name('berita.show');
Route::get('/desa-wisata', fn() => Inertia::render('Blank', ['title' => 'Desa Wisata & Peta Wisata']))->name('wisata');
Route::get('/potensi/pariwisata', fn() => Inertia::render('Blank', ['title' => 'Potensi Pariwisata']))->name('potensi.pariwisata');
Route::get('/potensi/pasar-desa', fn() => Inertia::render('Blank', ['title' => 'Pasar Desa']))->name('potensi.pasar');
Route::get('/potensi/kesenian', fn() => Inertia::render('Blank', ['title' => 'Kesenian Daerah']))->name('potensi.kesenian');
Route::get('/transparansi/apbdes', fn() => Inertia::render('Blank', ['title' => 'Laporan APBDes']))->name('transparansi.apbdes');
Route::get('/transparansi/realisasi', fn() => Inertia::render('Blank', ['title' => 'Realisasi Anggaran']))->name('transparansi.realisasi');
Route::get('/desa-online/syarat', fn() => Inertia::render('Blank', ['title' => 'Syarat Pelayanan']))->name('online.syarat');
Route::get('/desa-online/smard', fn() => Inertia::render('Blank', ['title' => 'Layanan Berbasis SMARD']))->name('online.smard');
Route::get('/buku-tamu', fn() => Inertia::render('Blank', ['title' => 'Buku Tamu']))->name('buku-tamu');
Route::get('/kontak', fn() => Inertia::render('Blank', ['title' => 'Kontak Kami']))->name('kontak');
Route::get('/umkm', [UmkmController::class, 'publicIndex'])->name('umkm.index');

// 3. HALAMAN ADMIN
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::resource('/berita', BeritaController::class)->except('show');
    Route::resource('/umkm', UmkmController::class)->except('show');
    Route::get('/profil', [ProfilController::class, 'index'])->name('profil.index');
    Route::post('/profil', [ProfilController::class, 'update'])->name('profil.update');
    Route::resource('/pemerintahan', PerangkatController::class)->except('show');
    Route::resource('/dusun', DusunController::class)->except('show');
});

// Auth
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';