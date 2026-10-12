<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Category;
use App\Models\VillageProfile; // <-- Jangan lupa tambahkan import ini di atas
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    public function index()
    {
        $berita = News::with('category')->latest('tanggal')->get();
        return Inertia::render('Admin/Berita/Index', [
            'berita' => $berita
        ]);
    }

    // ==========================================
    // TAMBAHKAN DUA METHOD INI UNTUK HALAMAN PUBLIK
    // ==========================================
    public function publicIndex()
    {
        return Inertia::render('BeritaIndex', [
            'profil' => VillageProfile::first(),
            'berita' => News::with('category')->latest('tanggal')->get()
        ]);
    }

    public function show($id)
    {
        $berita = News::with('category')->findOrFail($id);
        return Inertia::render('BeritaShow', [
            'profil' => VillageProfile::first(),
            'berita' => $berita,
            'beritaTerbaru' => News::latest('tanggal')->take(3)->get()
        ]);
    }
    // ==========================================

    public function create()
    {
        $kategori = Category::all();
        return Inertia::render('Admin/Berita/Create', [
            'kategori' => $kategori
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'category_id' => 'required',
            'tanggal' => 'required|date',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'isi' => 'required'
        ]);

        $imagePath = null;
        if ($request->hasFile('gambar')) {
            $imagePath = $request->file('gambar')->store('berita', 'public');
        }

        News::create([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul),
            'category_id' => $request->category_id,
            'user_id' => auth()->id(),
            'tanggal' => $request->tanggal,
            'gambar' => $imagePath,
            'isi' => $request->isi,
            'status' => 'published'
        ]);

        return redirect()->route('admin.berita.index');
    }

    public function edit($id)
    {
        $berita = News::findOrFail($id);
        $kategori = Category::all();
        
        return Inertia::render('Admin/Berita/Edit', [
            'berita' => $berita,
            'kategori' => $kategori
        ]);
    }

    public function update(Request $request, $id)
    {
        $berita = News::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'category_id' => 'required',
            'tanggal' => 'required|date',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'isi' => 'required'
        ]);

        $imagePath = $berita->gambar;

        if ($request->hasFile('gambar')) {
            if ($berita->gambar) {
                Storage::disk('public')->delete($berita->gambar);
            }
            $imagePath = $request->file('gambar')->store('berita', 'public');
        }

        $berita->update([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul),
            'category_id' => $request->category_id,
            'tanggal' => $request->tanggal,
            'gambar' => $imagePath,
            'isi' => $request->isi,
        ]);

        return redirect()->route('admin.berita.index');
    }

    public function destroy($id)
    {
        $berita = News::findOrFail($id);

        if ($berita->gambar) {
            Storage::disk('public')->delete($berita->gambar);
        }

        $berita->delete();
        return redirect()->route('admin.berita.index');
    }
}