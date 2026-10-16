import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function UmkmIndex({ profil, umkm, auth }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';

    const filteredUmkm = umkm.filter((item) => {
        const matchesSearch = item.nama_umkm?.toLowerCase().includes(search.toLowerCase()) ||
                              (item.produk && item.produk.toLowerCase().includes(search.toLowerCase())) ||
                              (item.pemilik && item.pemilik.toLowerCase().includes(search.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['Semua', 'Kuliner', 'Kerajinan', 'Jasa', 'Pertanian'];

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Direktori UMKM - ${namaDesa}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans">
                
                {/* 1. HERO SECTION UMKM */}
                <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white text-center py-24 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative max-w-3xl mx-auto space-y-4">
                        <span className="bg-green-700/60 text-green-200 border border-green-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Ekonomi Kerakyatan & Potensi Lokal
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Direktori UMKM & Produk Warga</h1>
                        <p className="text-green-100 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                            Dukung pertumbuhan ekonomi lokal dengan berbelanja langsung ke produk-produk unggulan warga {namaDesa}.
                        </p>
                    </div>
                </div>

                {/* 2. FILTER & SEARCH SECTION */}
                <div className="max-w-7xl mx-auto px-4 mt-12 w-full flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="w-full md:w-1/3">
                        <input 
                            type="text" 
                            placeholder="🔍 Cari nama usaha, pemilik, atau produk..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border-gray-200 bg-white rounded-2xl shadow-sm focus:ring-green-600 focus:border-green-600 px-5 py-3.5 text-sm transition"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition shadow-sm ${
                                    selectedCategory === cat 
                                        ? 'bg-green-700 text-white shadow-md' 
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. KONTEN DAFTAR UMKM */}
                <div className="max-w-7xl mx-auto py-12 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredUmkm.length > 0 ? (
                            filteredUmkm.map((item) => (
                                <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition duration-300 group">
                                    <div className="h-52 bg-green-50 flex items-center justify-center text-green-800 text-3xl font-bold relative overflow-hidden">
                                        {item.gambar ? (
                                            <img 
                                                src={`/storage/${item.gambar}`} 
                                                alt={item.nama_umkm} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                            />
                                        ) : (
                                            <span>🏪 {item.nama_umkm?.charAt(0) || 'U'}</span>
                                        )}
                                        {item.kategori && (
                                            <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3.5 py-1 rounded-full font-medium">
                                                {item.kategori}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                                        <div>
                                            <h4 className="font-extrabold text-xl text-gray-900 mb-1 group-hover:text-green-700 transition">{item.nama_umkm}</h4>
                                            <p className="text-sm text-gray-500 mb-2 font-medium">👤 Pemilik: {item.pemilik}</p>
                                            {item.alamat && <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">📍 {item.alamat}</p>}
                                            {item.produk && (
                                                <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full mb-3 inline-block">
                                                    🛍️ Produk: {item.produk}
                                                </span>
                                            )}
                                            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{item.deskripsi}</p>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 space-y-3">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl">
                                                    📞 {item.whatsapp || '-'}
                                                </span>
                                                {item.google_maps_url ? (
                                                    <a 
                                                        href={item.google_maps_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="text-blue-600 hover:underline font-bold flex items-center gap-1"
                                                    >
                                                        🗺️ Lihat Lokasi
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 italic">Maps tidak tersedia</span>
                                                )}
                                            </div>

                                            {item.whatsapp && (
                                                <a 
                                                    href={`https://wa.me/${item.whatsapp}?text=Halo%20${encodeURIComponent(item.nama_umkm)},%20saya%20melihat%20informasi%20usaha%20Anda%20di%20Website%20Desa%20Gedangan.`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="w-full bg-green-700 hover:bg-green-800 text-white text-xs py-3 rounded-2xl font-bold text-center block transition shadow-sm"
                                                >
                                                    💬 Chat WhatsApp Pemilik
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400 text-base italic">Tidak ada UMKM yang sesuai dengan pencarian atau kategori tersebut.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}