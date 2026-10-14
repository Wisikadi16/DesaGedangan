import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function BeritaIndex({ profil, berita, auth }) {
    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Arsip Berita & Kegiatan - ${profil?.nama_desa || 'Desa Gedangan'}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-green-800 to-teal-700 text-white text-center py-20 px-4">
                    <h2 className="text-4xl font-extrabold mb-3">Berita & Kegiatan Desa</h2>
                    <p className="text-green-100 max-w-2xl mx-auto text-lg">
                        Informasi terbaru seputar kegiatan pemerintahan desa, pembangunan, dan program KKN di Desa Gedangan.
                    </p>
                </div>

                {/* List Berita */}
                <div className="max-w-7xl mx-auto py-12 px-4 flex-grow w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {berita && berita.length > 0 ? (
                            berita.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-xl transition duration-300">
                                    <div className="h-48 bg-green-600 overflow-hidden relative">
                                        {item.gambar ? (
                                            <img src={`/storage/${item.gambar}`} alt={item.judul} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl bg-green-700">
                                                📰 Desa Gedangan
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                                                {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Terbaru'}
                                            </span>
                                            <h4 className="font-bold text-xl text-gray-900 mb-2 leading-snug">{item.judul}</h4>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.isi}</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100">
                                            <Link 
                                                href={route('berita.show', item.id)} 
                                                className="text-green-600 hover:text-green-800 text-sm font-bold flex items-center gap-1"
                                            >
                                                Baca Selengkapnya &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg italic">Belum ada berita atau pengumuman yang diterbitkan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}