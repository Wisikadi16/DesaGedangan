<?php

namespace App\Http\Middleware;

use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            // Dipakai navbar & footer di semua halaman publik (lazy: baru dihitung saat dibutuhkan)
            'profil' => fn () => VillageProfile::first(),
            // Pesan sukses dari ->with('message', '...') di controller, ditampilkan di panel admin
            'flash' => fn () => [
                'message' => $request->session()->get('message'),
            ],
        ];
    }
}
