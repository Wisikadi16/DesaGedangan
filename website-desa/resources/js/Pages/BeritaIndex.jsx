import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function BeritaIndex({ profil, berita, auth }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Arsip Berita & Kegiatan - ${namaDesa}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans">
                
                {/* 1. HERO SECTION BERITA */}
                <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white text-center py-24 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative max-w-3xl mx-auto space-y-4">
                        <span className="bg-green-700/60 text-green-200 border border-green-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Informasi & Publikasi Desa
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Berita & Kegiatan Desa</h1>
                        <p className="text-green-100 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                            Informasi terbaru seputar kegiatan pemerintahan desa, pembangunan, dan program KKN di {namaDesa}.
                        </p>
                    </div>
                </div>

                {/* 2. LIST BERITA */}
                <div className="max-w-7xl mx-auto py-16 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {berita && berita.length > 0 ? (
                            berita.map((item) => (
                                <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition duration-300 group">
                                    <div className="h-52 bg-green-50 overflow-hidden relative">
                                        {item.gambar ? (
                                            <img src={`/storage/${item.gambar}`} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-green-800 font-extrabold text-xl bg-green-100">
                                                📰 {namaDesa}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                                        <div>
                                            <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full mb-3 inline-block">
                                                {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Terbaru'}
                                            </span>
                                            <h4 className="font-extrabold text-xl text-gray-900 mb-2 leading-snug group-hover:text-green-700 transition">
                                                {item.judul}
                                            </h4>
                                            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{item.isi}</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100">
                                            <Link 
                                                href={route('berita.show', item.id)} 
                                                className="text-green-700 hover:text-green-900 text-sm font-bold flex items-center gap-1.5"
                                            >
                                                Baca Selengkapnya &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400 text-base italic">Belum ada berita atau pengumuman yang diterbitkan.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}