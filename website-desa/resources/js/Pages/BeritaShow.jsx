import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { renderFormattedText } from '@/utils/textParser';

export default function BeritaShow({ profil, berita, beritaTerbaru, auth }) {
    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`${berita.judul} - ${profil?.nama_desa || 'Desa Gedangan'}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans">
                {/* Main Content */}
                <div className="max-w-4xl mx-auto py-16 px-4 w-full">
                    <Link href={route('berita')} className="text-green-600 font-bold text-sm hover:underline mb-4 inline-block">
                        ← Kembali ke Arsip Berita
                    </Link>

                    {/* Judul Berita */}
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                        {berita.judul}
                    </h1>

                    <p className="text-sm text-gray-500 mb-6 font-medium">
                        📅 Diterbitkan pada {berita.tanggal ? new Date(berita.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Baru saja'}
                    </p>

                    {/* Gambar Berita */}
                    {berita.gambar && (
                        <div className="mb-8 rounded-2xl overflow-hidden shadow-md max-h-[400px] w-full bg-gray-100 flex justify-center">
                            <img src={`/storage/${berita.gambar}`} alt={berita.judul} className="w-full h-[400px] object-cover" />
                        </div>
                    )}

                    {/* Isi Berita */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 prose max-w-none text-gray-700 leading-relaxed text-lg mb-12">
                        {renderFormattedText(berita.isi)}
                    </div>

                    {/* Berita Lainnya */}
                    <div className="border-t pt-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Berita Terbaru Lainnya</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {beritaTerbaru.map((item) => (
                                <Link key={item.id} href={route('berita.show', item.id)} className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition">
                                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">{item.judul}</h4>
                                    <p className="text-xs text-gray-500">{new Date(item.tanggal || item.created_at).toLocaleDateString('id-ID')}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}