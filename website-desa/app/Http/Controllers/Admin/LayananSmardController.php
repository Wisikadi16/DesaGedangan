<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LayananSmard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LayananSmardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/LayananSmard/Index', [
            'layananSmard' => LayananSmard::first()
        ]);
    }

    public function update(Request $request)
    {
        $smard = LayananSmard::first() ?? new LayananSmard();

        $data = $request->validate([
            'judul' => 'required|string|max:255',
            'sub_judul' => 'nullable|string',
            'paragraf_utama' => 'nullable|string',
            'tujuan_poin' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            if ($smard->gambar) {
                Storage::disk('public')->delete($smard->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('smard', 'public');
        }

        $smard->fill($data)->save();

        return redirect()->back()->with('message', 'Konten Layanan SMARD berhasil diperbarui!');
    }
}