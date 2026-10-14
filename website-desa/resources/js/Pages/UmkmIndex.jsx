import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function UmkmIndex({ profil, umkm, auth }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

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
            <Head title={`Direktori UMKM - ${profil?.nama_desa || 'Desa Gedangan'}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-green-800 to-teal-700 text-white text-center py-20 px-4">
                    <h2 className="text-4xl font-extrabold mb-3">Direktori UMKM & Produk Warga</h2>
                    <p className="text-green-100 max-w-2xl mx-auto text-lg">
                        Dukung pertumbuhan ekonomi lokal dengan berbelanja langsung ke produk-produk unggulan warga Desa Gedangan.
                    </p>
                </div>

                {/* Filter & Search Section */}
                <div className="max-w-7xl mx-auto px-4 mt-10 w-full flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="w-full md:w-1/3">
                        <input 
                            type="text" 
                            placeholder="🔍 Cari nama usaha, pemilik, atau produk..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 px-4 py-3 text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm ${
                                    selectedCategory === cat 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Konten Daftar UMKM */}
                <div className="max-w-7xl mx-auto py-8 px-4 flex-grow w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredUmkm.length > 0 ? (
                            filteredUmkm.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-xl transition duration-300">
                                    <div className="h-48 bg-green-600 flex items-center justify-center text-white text-3xl font-bold relative overflow-hidden">
                                        {item.gambar ? (
                                            <img 
                                                src={`/storage/${item.gambar}`} 
                                                alt={item.nama_umkm} 
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            <span>🏪 {item.nama_umkm?.charAt(0) || 'U'}</span>
                                        )}
                                        {item.kategori && (
                                            <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                                                {item.kategori}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-xl text-gray-900 mb-1">{item.nama_umkm}</h4>
                                            <p className="text-sm text-gray-500 mb-1 font-medium">👤 Pemilik: {item.pemilik}</p>
                                            {item.alamat && <p className="text-xs text-gray-500 mb-2">📍 {item.alamat}</p>}
                                            {item.produk && (
                                                <p className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                                                    🛍️ Produk: {item.produk}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.deskripsi}</p>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 space-y-3">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded">
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

                                            <div className="flex gap-2">
                                                {item.whatsapp && (
                                                    <a 
                                                        href={`https://wa.me/${item.whatsapp}?text=Halo%20${encodeURIComponent(item.nama_umkm)},%20saya%20melihat%20informasi%20usaha%20Anda%20di%20Website%20Desa%20Gedangan.`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="flex-1 bg-green-600 text-white text-xs py-2.5 rounded-xl font-bold text-center hover:bg-green-700 transition shadow-sm"
                                                    >
                                                        💬 Chat WhatsApp
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg italic">Tidak ada UMKM yang sesuai dengan pencarian atau kategori tersebut.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}