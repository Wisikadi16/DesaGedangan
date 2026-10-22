import { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

// Komponen kecil untuk handle teks panjang "Baca Selengkapnya" & format Enter (whitespace-pre-line)
function DeskripsiItem({ text }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return null;

    // Batasi jumlah karakter awal sebelum dipotong
    const limit = 150;
    const isLongText = text.length > limit;
    const displayedText = isExpanded || !isLongText ? text : text.substring(0, limit) + '...';

    return (
        <div className="mt-2 text-xs text-gray-700 leading-relaxed">
            {/* whitespace-pre-line membuat fungsi Enter (\n) dari admin berfungsi di web publik */}
            <p className="whitespace-pre-line">{displayedText}</p>
            {isLongText && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-green-700 hover:text-green-900 font-bold mt-1.5 inline-flex items-center gap-1 focus:outline-none bg-green-50 px-2 py-1 rounded"
                >
                    {isExpanded ? '▲ Sembunyikan' : '▼ Selengkapnya'}
                </button>
            )}
        </div>
    );
}

export default function Transparansi({ profil, transparansis }) {
    return (
        <PublicLayout profil={profil}>
            <Head title="Transparansi Anggaran Desa" />

            <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
                
                {/* HERO BANNER HIJAU KONSISTEN */}
                <div className="bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white py-16 px-4 text-center">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <span className="bg-green-700/60 text-green-200 border border-green-500/30 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Keterbukaan Informasi Publik
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                            Transparansi
                        </h1>
                        <p className="text-green-100 text-sm md:text-base max-w-2xl mx-auto font-light">
                            Wujud akuntabilitas dan komitmen Pemerintahan Desa Gedangan dalam mengelola APBDes secara transparan dan akurat.
                        </p>
                    </div>
                </div>

                {/* KONTEN UTAMA */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="text-green-700">📊</span> Arsip Dokumen Transparansi
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-green-50 text-green-900 text-sm border-b border-green-100">
                                        <th className="p-4 font-bold rounded-l-xl w-32">Tahun</th>
                                        <th className="p-4 font-bold">Keterangan / Judul Laporan</th>
                                        <th className="p-4 font-bold rounded-r-xl text-center w-40">Unduh Dokumen</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                    {transparansis && transparansis.length > 0 ? (
                                        transparansis.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/80 transition align-top">
                                                <td className="p-4 font-semibold text-gray-900">{item.tahun || '-'}</td>
                                                <td className="p-4">
                                                    <div className="font-bold text-gray-900 text-base">{item.judul}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">
                                                        Kategori: <span className="text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded border border-green-200">{item.kategori}</span>
                                                    </div>
                                                    {/* Panggil komponen teks dengan fitur Baca Selengkapnya & Format Enter */}
                                                    <DeskripsiItem text={item.deskripsi} />
                                                </td>
                                                <td className="p-4 text-center">
                                                    {item.file_lampiran ? (
                                                        <a 
                                                            href={`/storage/${item.file_lampiran}`} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm whitespace-nowrap"
                                                        >
                                                            <span>📥</span> Download PDF
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs italic bg-gray-100 px-3 py-1.5 rounded-lg inline-block">File belum tersedia</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="p-12 text-center text-gray-500 italic">
                                                Belum ada data transparansi anggaran yang diunggah.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}