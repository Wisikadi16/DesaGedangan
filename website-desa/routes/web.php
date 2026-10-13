<?php

use App\Http\Controllers\Admin\BeritaController;
use App\Http\Controllers\Admin\ProfilController;
use App\Http\Controllers\Admin\UmkmController;
use App\Http\Controllers\ProfileController;
use App\Models\News;
use App\Models\VillageProfile;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ==============================================================
// 1. HALAMAN PUBLIK (Beranda Utama)
// ==============================================================
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'profil' => VillageProfile::first(),
        'berita' => News::with('category')
            ->where('status', 'published')
            ->latest('tanggal')
            ->take(3)
            ->get(),
    ]);
})->name('home');

// ==============================================================
// 2. RUTE HALAMAN KOSONGAN & PUBLIK LAINNYA (Sesuai Navbar)
// ==============================================================
// Profil
Route::get('/profil/desa', function () {
    return Inertia::render('ProfilDesa', [
        'profil' => VillageProfile::first(),
    ]);
})->name('profil.desa');

Route::get('/profil/pemerintahan', fn() => Inertia::render('Blank', ['title' => 'Pemerintahan']))->name('profil.pemerintahan');
Route::get('/profil/kondisi-umum', fn() => Inertia::render('Blank', ['title' => 'Kondisi Umum']))->name('profil.kondisi');
Route::get('/profil/penduduk', fn() => Inertia::render('Blank', ['title' => 'Profil Penduduk']))->name('profil.penduduk');
Route::get('/profil/potensi-masalah', fn() => Inertia::render('Blank', ['title' => 'Potensi dan Masalah']))->name('profil.masalah');
Route::get('/profil/dusun', fn() => Inertia::render('Blank', ['title' => 'Dusun']))->name('profil.dusun');

// Berita & Wisata (Publik Berita)
Route::get('/berita', [BeritaController::class, 'publicIndex'])->name('berita');
Route::get('/berita/{id}', [BeritaController::class, 'show'])->whereNumber('id')->name('berita.show');
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

// UMKM Publik
Route::get('/umkm', [UmkmController::class, 'publicIndex'])->name('umkm.index');

// ==============================================================
// 3. HALAMAN ADMIN (Khusus Perangkat Desa, Wajib Login)
// ==============================================================
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Rute Manual Berita Admin
    Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
    Route::get('/berita/tambah', [BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::get('/berita/{id}/edit', [BeritaController::class, 'edit'])->name('berita.edit');
    Route::put('/berita/{id}', [BeritaController::class, 'update'])->name('berita.update');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');

    // Resource UMKM & Profil (hanya rute yang method-nya memang ada di controller)
    Route::resource('/umkm', UmkmController::class)->except('show');
    Route::resource('/profil', ProfilController::class)->only('index');
});

// Bawaan sistem login Laravel
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';