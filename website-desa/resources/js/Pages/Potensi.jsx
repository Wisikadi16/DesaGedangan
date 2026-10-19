import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Potensi({ title, potensi }) {
    const [expandedId, setExpandedId] = useState(null);

    const toggleReadMore = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <PublicLayout>
            <Head title={title} />
            
            {/* Header Halaman (WARNA HIJAU DIUBAH JADI GRADASI HIJAU TUA KAYA HALAMAN LAIN) */}
            <div className="bg-gradient-to-r from-green-900 via-green-800 to-teal-800 py-24 text-center shadow-inner">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl font-black text-white mb-3 tracking-wide">{title}</h1>
                    <p className="text-base text-green-100 font-medium">
                        Jelajahi dan temukan informasi menarik mengenai {title.toLowerCase()} di Desa Gedangan.
                    </p>
                </div>
            </div>

            {/* Konten Utama List Berita/Artikel (STRUKTUR ASLI 100% AMAN TANPA DIUBAH) */}
            <div className="max-w-4xl mx-auto px-4 my-12 w-full sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {potensi && potensi.length > 0 ? (
                        potensi.map((item) => {
                            const isExpanded = expandedId === item.id;
                            
                            return (
                                <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition duration-300 items-stretch">
                                    
                                    {/* Kolom Gambar */}
                                    <div className="md:w-2/5 shrink-0 bg-gray-100 relative min-h-[220px]">
                                        {item.gambar ? (
                                            <img 
                                                src={`/storage/${item.gambar}`} 
                                                alt={item.judul} 
                                                className="w-full h-full object-cover absolute inset-0" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center absolute inset-0">
                                                <svg className="w-10 h-10 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <span className="text-xs font-medium">Tidak ada gambar</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Kolom Konten Teks */}
                                    <div className="p-8 flex flex-col justify-between flex-1">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-extrabold uppercase tracking-wider">
                                                    {item.kategori}
                                                </span>
                                                <span className="text-xs font-semibold text-gray-400">
                                                    Diposkan: {item.tanggal}
                                                </span>
                                            </div>
                                            
                                            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                                                {item.judul}
                                            </h2>
                                            
                                            <div className={`text-gray-600 text-sm leading-relaxed ${!isExpanded ? 'line-clamp-3' : 'whitespace-pre-wrap'}`}>
                                                {item.konten}
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <button 
                                                onClick={() => toggleReadMore(item.id)}
                                                className="text-sm font-bold text-green-700 hover:text-green-800 transition flex items-center gap-1"
                                            >
                                                {isExpanded ? 'Tutup ringkasan ↑' : 'Baca selengkapnya →'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 7H20" />
                            </svg>
                            <h3 className="text-lg font-bold text-gray-700">Belum Ada Informasi</h3>
                            <p className="text-sm text-gray-400 mt-1">Konten untuk {title.toLowerCase()} belum ditambahkan.</p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}