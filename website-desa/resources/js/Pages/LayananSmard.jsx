import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function LayananSmard({ profil, auth, layananSmard }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Layanan Berbasis SMARD - ${namaDesa}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans pb-20">
                
                {/* HERO SECTION */}
                <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white text-center py-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative max-w-3xl mx-auto space-y-3">
                        <span className="bg-green-700/60 text-green-200 border border-green-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Desa Online & Administrasi
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            {layananSmard?.judul || 'LAYANAN DESA DENGAN APLIKASI SMARD'}
                        </h1>
                        <p className="text-green-100 text-sm md:text-base font-light">
                            Pemerintah Desa Gedangan, Kecamatan Tuntang, Kabupaten Semarang
                        </p>
                    </div>
                </div>

                {/* KONTEN UTAMA */}
                <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
                    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 md:p-12 space-y-8">
                        
                        {/* Sub Judul */}
                        {layananSmard?.sub_judul && (
                            <div className="text-base md:text-lg font-semibold text-green-800 bg-green-50 p-4 rounded-2xl border border-green-100">
                                {layananSmard.sub_judul}
                            </div>
                        )}

                        {/* Gambar / Screenshot */}
                        {layananSmard?.gambar && (
                            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                                <img src={`/storage/${layananSmard.gambar}`} alt="Aplikasi SMARD" className="w-full h-auto object-cover" />
                            </div>
                        )}

                        {/* Paragraf Utama */}
                        <div className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
                            {layananSmard?.paragraf_utama || (
                                <p className="italic text-gray-400 text-center py-6">Konten narasi SMARD belum diisi oleh admin.</p>
                            )}
                        </div>

                        {/* Daftar Tujuan / Poin */}
                        {layananSmard?.tujuan_poin && (
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="font-extrabold text-gray-900 text-lg">Layanan ini bertujuan untuk:</h3>
                                <ul className="space-y-3 text-gray-600">
                                    {layananSmard.tujuan_poin.split('\n').map((poin, idx) => (
                                        poin.trim() !== '' && (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className="text-green-600 font-bold mt-1">✓</span>
                                                <span className="leading-relaxed">{poin}</span>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}