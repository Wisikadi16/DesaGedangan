import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Transparansi({ profil, transparansi }) {
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
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="text-green-700">📊</span> Transparansi
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-green-50 text-green-900 text-sm border-b border-green-100">
                                        <th className="p-4 font-bold rounded-l-xl">Tahun / Periode</th>
                                        <th className="p-4 font-bold">Keterangan / Judul Laporan</th>
                                        <th className="p-4 font-bold rounded-r-xl text-center">Unduh Dokumen</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                    {transparansi && transparansi.length > 0 ? (
                                        transparansi.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/80 transition">
                                                <td className="p-4 font-semibold text-gray-900">{item.tahun || '-'}</td>
                                                <td className="p-4">{item.judul}</td>
                                                <td className="p-4 text-center">
                                                    {item.file ? (
                                                        <a 
                                                            href={`/storage/${item.file}`} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                                                        >
                                                            <span>📥</span> Download PDF
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs italic">File belum tersedia</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="p-8 text-center text-gray-500 italic">
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