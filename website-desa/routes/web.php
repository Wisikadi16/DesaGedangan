<?php

use App\Http\Controllers\Admin\BeritaController;
use App\Http\Controllers\Admin\DusunController;
use App\Http\Controllers\Admin\PerangkatController;
use App\Http\Controllers\Admin\ProfilController;
use App\Http\Controllers\Admin\UmkmController;
// Tambahan Import Transparansi Controller
use App\Http\Controllers\Admin\TransparansiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilPublikController;
use App\Http\Controllers\Admin\DesaWisataController as AdminDesaWisataController;
use App\Http\Controllers\Admin\SyaratPelayananController as AdminSyaratPelayananController;
use App\Http\Controllers\Admin\LayananSmardController as AdminLayananSmardController;
use App\Http\Controllers\Admin\PotensiDesaController as AdminPotensiDesaController;
use App\Models\News;
use App\Models\VillageProfile;
use App\Models\DesaWisata;
use App\Models\SyaratPelayanan;
use App\Models\LayananSmard;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. HALAMAN BERANDA
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'profil' => VillageProfile::first(),
        'berita' => News::with('category')->where('status', 'published')->latest('tanggal')->take(3)->get(),
    ]);
})->name('home');

// 2. HALAMAN PROFIL
Route::get('/profil', [ProfilPublikController::class, 'index'])->name('profil.index');

// 3. HALAMAN PUBLIK (Berita, UMKM, Desa Wisata, Syarat Pelayanan, Layanan SMARD, Transparansi)
Route::get('/berita', [BeritaController::class, 'publicIndex'])->name('berita');
Route::get('/berita/{id}', [BeritaController::class, 'show'])->whereNumber('id')->name('berita.show');
Route::get('/umkm', [UmkmController::class, 'publicIndex'])->name('umkm.index');

// Transparansi Publik
Route::get('/transparansi', [TransparansiController::class, 'publicIndex'])->name('transparansi.index');

Route::get('/desa-wisata', function () {
    return Inertia::render('DesaWisata', [
        'profil' => VillageProfile::first(),
        'desaWisata' => DesaWisata::first(),
    ]);
})->name('wisata');

Route::get('/desa-online/syarat', function () {
    return Inertia::render('SyaratPelayanan', [
        'profil' => VillageProfile::first(),
        'syaratPelayanans' => SyaratPelayanan::all(),
    ]);
})->name('online.syarat');

Route::get('/desa-online/smard', function () {
    return Inertia::render('LayananSmard', [
        'profil' => VillageProfile::first(),
        'layananSmard' => LayananSmard::first(),
    ]);
})->name('online.smard');

// Potensi Desa (Publik)
Route::get('/potensi/pariwisata', function () {
    return Inertia::render('Potensi', [
        'title' => 'Potensi Pariwisata',
        'potensi' => \App\Models\PotensiDesa::where('kategori', 'Pariwisata')->latest('tanggal')->get()
    ]);
})->name('potensi.pariwisata');

Route::get('/potensi/pasar-desa', function () {
    return Inertia::render('Potensi', [
        'title' => 'Pasar Desa',
        'potensi' => \App\Models\PotensiDesa::where('kategori', 'Pasar Desa')->latest('tanggal')->get()
    ]);
})->name('potensi.pasar');

Route::get('/potensi/kesenian', function () {
    return Inertia::render('Potensi', [
        'title' => 'Kesenian Daerah',
        'potensi' => \App\Models\PotensiDesa::where('kategori', 'Kesenian')->latest('tanggal')->get()
    ]);
})->name('potensi.kesenian');

// Lain-lain
Route::get('/buku-tamu', fn() => Inertia::render('Blank', ['title' => 'Buku Tamu']))->name('buku-tamu');
Route::get('/kontak', fn() => Inertia::render('Blank', ['title' => 'Kontak Kami']))->name('kontak');

// 4. HALAMAN ADMIN
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    
    // Kelola Desa Wisata
    Route::get('/desa-wisata', [AdminDesaWisataController::class, 'index'])->name('desa-wisata.index');
    Route::post('/desa-wisata', [AdminDesaWisataController::class, 'update'])->name('desa-wisata.update');

    // Kelola Syarat Pelayanan Administrasi
    Route::resource('/syarat-pelayanan', AdminSyaratPelayananController::class)->except(['show', 'create', 'edit']);

    // Kelola Layanan Berbasis SMARD
    Route::get('/layanan-smard', [AdminLayananSmardController::class, 'index'])->name('layanan-smard.index');
    Route::post('/layanan-smard', [AdminLayananSmardController::class, 'update'])->name('layanan-smard.update');

    // Kelola Potensi Desa (Pariwisata, Pasar, Kesenian)
    Route::resource('/potensi-desa', AdminPotensiDesaController::class)->except(['show', 'create', 'edit']);

    // Kelola Modul Utama
    Route::resource('/berita', BeritaController::class)->except('show');
    Route::resource('/umkm', UmkmController::class)->except('show');
    
    // Tambahan Resource Admin Transparansi
    Route::resource('/transparansi', TransparansiController::class)->except('show');
    
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