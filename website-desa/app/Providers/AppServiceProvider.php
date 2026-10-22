<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\URL; // <-- 1. Import facade URL di sini
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // 2. Paksa Laravel menggunakan HTTPS (sangat penting saat pakai ngrok/tunnel publik)
        if ($this->app->environment('production') || request()->header('x-forwarded-proto') == 'https') {
            URL::forceScheme('https');
        }
    }
}