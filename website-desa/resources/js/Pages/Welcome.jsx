import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Welcome({ profil, berita, auth }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Selamat Datang - ${namaDesa}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans">
                {/* Hero Section */}
                <div className="bg-green-900 text-white text-center py-32 px-4 mt-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Selamat Datang di {namaDesa}</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto font-light">{profil?.deskripsi || 'Website Resmi Pemerintahan Desa'}</p>
                </div>

                {/* Berita Section */}
                <div className="max-w-7xl mx-auto py-16 px-4">
                    <div className="flex justify-between items-end mb-8">
                        <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-green-500 pb-2 inline-block">Kabar Desa Terbaru</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {berita && berita.length > 0 ? berita.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition duration-300">
                                {item.gambar ? (
                                    <img src={`/storage/${item.gambar}`} alt={item.judul} className="h-48 w-full object-cover" />
                                ) : (
                                    <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 font-bold">[TIDAK ADA GAMBAR]</div>
                                )}
                                <div className="p-6">
                                    <span className="text-xs text-green-600 font-extrabold uppercase bg-green-100 px-3 py-1 rounded-full">{item.category?.nama}</span>
                                    <h4 className="font-bold text-xl mt-4 mb-2 text-gray-900 leading-tight">{item.judul}</h4>
                                    <p className="text-gray-600 text-sm mb-4">{item.isi.substring(0, 90)}...</p>
                                    <button className="text-green-600 text-sm font-bold hover:underline">Baca Selengkapnya &rarr;</button>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 col-span-3 text-center italic">Belum ada berita yang dipublikasikan.</p>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}