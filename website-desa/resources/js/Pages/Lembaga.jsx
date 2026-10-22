import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useState } from 'react';

export default function Lembaga({ profil, lembagas }) {
    // Ambil daftar kategori unik dari data lembaga yang ada
    const categories = [...new Set(lembagas.map(item => item.kategori))];
    const [activeTab, setActiveTab] = useState(categories[0] || 'BPD');

    // Filter data berdasarkan tab yang aktif
    const filteredLembaga = lembagas.filter(item => item.kategori === activeTab);

    return (
        <PublicLayout profil={profil}>
            <Head title="Lembaga Desa" />

            <div className="bg-gray-50 text-gray-800 font-sans min-h-screen pb-16">
                
                {/* HERO BANNER */}
                <div className="bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white py-16 px-4 text-center">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <span className="bg-green-700/65 text-green-200 border border-green-500/30 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Pemerintahan Desa
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                            Lembaga & Organisasi Desa
                        </h1>
                        <p className="text-green-100 text-sm md:text-base max-w-2xl mx-auto font-light">
                            Daftar kepengurusan lembaga kemasyarakatan yang aktif berperan dalam membangun Desa Gedangan.
                        </p>
                    </div>
                </div>

                {/* KONTEN UTAMA */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    
                    {/* TAB KATEGORI */}
                    {categories.length > 0 ? (
                        <>
                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveTab(cat)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm ${
                                            activeTab === cat
                                                ? 'bg-green-700 text-white shadow-green-700/20'
                                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* TABEL / DAFTAR PENGURUS */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                                    <span>Struktur Pengurus: {activeTab}</span>
                                    <span className="text-xs font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {filteredLembaga.length} Anggota
                                    </span>
                                </h3>

                                {filteredLembaga.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {filteredLembaga.map((item) => (
                                            <div key={item.id} className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100 flex flex-col justify-between space-y-3">
                                                <div>
                                                    <span className="text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 px-2.5 py-1 rounded-md inline-block mb-2">
                                                        {item.jabatan || 'Anggota'}
                                                    </span>
                                                    <h4 className="text-base font-bold text-gray-900">{item.nama}</h4>
                                                </div>
                                                {item.alamat_atau_keterangan && (
                                                    <p className="text-xs text-gray-500 pt-2 border-t border-gray-200/60">
                                                        <span className="font-semibold text-gray-700">Keterangan:</span> {item.alamat_atau_keterangan}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-400 italic">
                                        Belum ada data pengurus untuk kategori {activeTab}.
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 text-gray-500 italic shadow-sm">
                            Belum ada data lembaga desa yang diunggah.
                        </div>
                    )}
                </div>

            </div>
        </PublicLayout>
    );
}