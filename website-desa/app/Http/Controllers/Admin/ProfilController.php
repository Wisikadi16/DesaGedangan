<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilController extends Controller
{
    public function index()
    {
        // Menampilkan halaman Index Profil
        return Inertia::render('Admin/Profil/Index');
    }
}