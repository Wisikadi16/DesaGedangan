import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Welcome({ auth, profil, beritaTerbaru, umkmTerbaru }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Beranda - ${namaDesa}`} />

            <div className="bg-gray-50 text-gray-800 font-sans">
                
                {/* 1. HERO SECTION (Modern & Clean) */}
                <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white py-24 md:py-32 px-4 text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative max-w-4xl mx-auto space-y-6">
                        <span className="bg-green-700/60 text-green-200 border border-green-500/30 text-xs md:text-sm px-4 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Website Resmi Pemerintahan Desa
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            Selamat Datang di <span className="text-green-300">{namaDesa}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto font-light leading-relaxed">
                            {profil?.deskripsi || 'Pusat informasi layanan publik, transparansi desa, potensi wisata, dan direktori UMKM warga.'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <a href="/profil" className="px-8 py-3.5 bg-white text-green-900 rounded-xl font-bold text-sm shadow-lg hover:bg-green-50 transition transform hover:-translate-y-0.5">
                                Jajaki Profil Desa →
                            </a>
                            <a href="/umkm" className="px-8 py-3.5 bg-green-700/80 hover:bg-green-700 border border-green-500/40 text-white rounded-xl font-bold text-sm backdrop-blur-sm transition">
                                Lihat UMKM Warga
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2. QUICK ACCESS CARDS */}
                <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <a href="/profil#pemerintahan" className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition group text-center md:text-left">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition transform inline-block">🏛️</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">Pemerintahan</h3>
                            <p className="text-xs text-gray-500">Struktur perangkat dan aparatur desa.</p>
                        </a>
                        <a href="/profil#kondisi" className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition group text-center md:text-left">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition transform inline-block">🗺️</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">Kondisi Wilayah</h3>
                            <p className="text-xs text-gray-500">Geografis, batas, dan topografi desa.</p>
                        </a>
                        <a href="/profil#penduduk" className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition group text-center md:text-left">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition transform inline-block">📊</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">Data Penduduk</h3>
                            <p className="text-xs text-gray-500">Demografi umur, agama, dan pekerjaan.</p>
                        </a>
                        <a href="/umkm" className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition group text-center md:text-left">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition transform inline-block">🛍️</div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">UMKM Lokal</h3>
                            <p className="text-xs text-gray-500">Produk unggulan dan kuliner warga.</p>
                        </a>
                    </div>
                </div>

                {/* 3. SAMBUTAN / TENTANG SINGKAT */}
                <div className="max-w-7xl mx-auto px-4 py-12 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-green-700 font-bold text-xs uppercase tracking-widest bg-green-50 px-3 py-1 rounded-md">Tentang Wilayah</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                Membangun Desa Berbasis Digital & Kreatif
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                Desa Gedangan terus berinovasi dalam memberikan pelayanan terbaik kepada masyarakat melalui transparansi informasi, pemberdayaan UMKM lokal, serta penyediaan data kependudukan yang akurat dan transparan.
                            </p>
                            <div className="pt-2">
                                <a href="/profil#sejarah" className="text-green-700 font-bold hover:text-green-800 text-sm flex items-center gap-2">
                                    Pelajari Sejarah & Visi Misi Desa →
                                </a>
                            </div>
                        </div>
                        <div className="bg-green-100 rounded-3xl overflow-hidden shadow-inner h-80 flex items-center justify-center border border-green-200">
                            {profil?.cover ? (
                                <img src={`/storage/${profil.cover}`} alt="Desa Gedangan" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-green-800 font-extrabold text-2xl tracking-wider">🌿 {namaDesa}</div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}