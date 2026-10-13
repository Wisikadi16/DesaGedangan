<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\News;
use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BeritaController extends Controller
{
    // ==========================================
    // ADMIN
    // ==========================================
    public function index()
    {
        return Inertia::render('Admin/Berita/Index', [
            'berita' => News::with('category')->latest('tanggal')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Berita/Create', [
            'kategori' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules());

        $data['slug'] = $this->uniqueSlug($data['judul']);
        $data['user_id'] = auth()->id();
        $data['status'] = 'published';
        $data['gambar'] = $request->hasFile('gambar')
            ? $request->file('gambar')->store('berita', 'public')
            : null;

        News::create($data);

        return redirect()->route('admin.berita.index');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Berita/Edit', [
            'berita' => News::findOrFail($id),
            'kategori' => Category::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $berita = News::findOrFail($id);

        $data = $request->validate($this->rules());

        if ($request->hasFile('gambar')) {
            // Simpan foto baru DULU; hapus foto lama hanya kalau penyimpanan berhasil
            $gambarBaru = $request->file('gambar')->store('berita', 'public');
            if ($berita->gambar) {
                Storage::disk('public')->delete($berita->gambar);
            }
            $data['gambar'] = $gambarBaru;
        } else {
            // Tidak ada upload baru -> jangan sentuh kolom gambar
            unset($data['gambar']);
        }

        // Slug sengaja tidak diubah saat edit (URL berita memakai id, bukan slug)
        $berita->update($data);

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

    // ==========================================
    // HALAMAN PUBLIK (hanya berita berstatus "published")
    // ==========================================
    public function publicIndex()
    {
        return Inertia::render('BeritaIndex', [
            'profil' => VillageProfile::first(),
            'berita' => News::with('category')
                ->where('status', 'published')
                ->latest('tanggal')
                ->get(),
        ]);
    }

    public function show($id)
    {
        $berita = News::with('category')
            ->where('status', 'published')
            ->findOrFail($id);

        return Inertia::render('BeritaShow', [
            'profil' => VillageProfile::first(),
            'berita' => $berita,
            'beritaTerbaru' => News::where('status', 'published')
                ->where('id', '!=', $berita->id) // jangan tampilkan berita yang sedang dibaca
                ->latest('tanggal')
                ->take(3)
                ->get(),
        ]);
    }

    // ==========================================
    // HELPER
    // ==========================================

    /** Aturan validasi dipakai bersama oleh store() dan update(). */
    private function rules(): array
    {
        return [
            'judul' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'tanggal' => 'required|date',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'isi' => 'required|string',
        ];
    }

    /** Slug unik: "kerja-bakti", lalu "kerja-bakti-2", "kerja-bakti-3", dst. */
    private function uniqueSlug(string $judul): string
    {
        $base = Str::slug($judul) ?: 'berita'; // judul hanya simbol -> slug kosong
        $slug = $base;
        $i = 2;

        while (News::where('slug', $slug)->exists()) {
            $slug = $base . '-' . $i++;
        }

        return $slug;
    }
}