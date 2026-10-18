import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Transparansi({ profil, title, transparansis }) {
    return (
        <PublicLayout profil={profil}>
            <Head title={title} />
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
                <div className="mb-8 border-b pb-4">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                        {title}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Pusat informasi dan arsip laporan transparansi Pemerintah Desa Gedangan.
                    </p>
                </div>
                {transparansis && transparansis.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transparansis.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                                <div>
                                    {item.gambar && (
                                        <img 
                                            src={`/storage/${item.gambar}`} 
                                            alt={item.judul} 
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-5">
                                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full uppercase">
                                            {item.kategori || 'Umum'}
                                        </span>
                                        <h2 className="text-lg font-bold text-gray-800 mt-3 mb-2 line-clamp-2">
                                            {item.judul}
                                        </h2>
                                        <p className="text-xs text-gray-400 mb-3">
                                            {item.tanggal}
                                        </p>
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {item.deskripsi}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-5 pt-0">
                                    {item.file_lampiran ? (
                                        <a 
                                            href={`/storage/${item.file_lampiran}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-block px-4 py-2 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition"
                                        >
                                            Lihat Dokumen
                                        </a>
                                    ) : (
                                        <button className="inline-block px-4 py-2 bg-gray-200 text-gray-500 text-xs font-bold rounded cursor-not-allowed">
                                            Dokumen Belum Tersedia
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-sm">Belum ada data atau laporan transparansi yang dipublikasikan.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}