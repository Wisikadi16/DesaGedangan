import { Head, Link } from '@inertiajs/react';

export default function BeritaShow({ profil, berita, beritaTerbaru }) {
    return (
        <>
            <Head title={`${berita.judul} - ${profil?.nama_desa || 'Desa Gedangan'}`} />
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
                
                {/* Navbar */}
                <nav className="bg-white shadow-md w-full fixed top-0 z-50 h-16">
                    <div className="w-full px-6 lg:px-12 flex justify-between items-center h-full">
                        <Link href={route('home')} className="font-extrabold text-2xl text-green-700 tracking-wider">
                            {profil?.nama_desa || 'DESA'}
                        </Link>
                        <div className="flex items-center space-x-8 h-full">
                            <ul className="hidden lg:flex space-x-6 font-bold text-sm text-gray-700 h-full">
                                <li className="h-full flex items-center"><Link href={route('home')} className="hover:text-green-600 transition">Beranda</Link></li>
                                <li className="h-full flex items-center"><Link href={route('berita')} className="text-green-600 transition">Berita</Link></li>
                                <li className="h-full flex items-center"><Link href={route('umkm.index')} className="hover:text-green-600 transition">UMKM Warga</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto py-16 px-4 mt-16 flex-grow w-full">
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

                    {/* PERBAIKAN: Batasi tinggi & buat object-fit cover agar gambar tidak raksasa */}
                    {berita.gambar && (
                        <div className="mb-8 rounded-2xl overflow-hidden shadow-md max-h-[400px] w-full bg-gray-100 flex justify-center">
                            <img src={`/storage/${berita.gambar}`} alt={berita.judul} className="w-full h-[400px] object-cover" />
                        </div>
                    )}

                    {/* PERBAIKAN: Menggunakan berita.isi */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-lg mb-12">
                        {berita.isi}
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

                {/* Footer */}
                <footer className="bg-gray-900 text-white text-center py-10 mt-12">
                    <h3 className="text-xl font-bold mb-2">{profil?.nama_desa || 'Desa Gedangan'}</h3>
                    <p className="text-gray-400 text-sm mb-4">Kecamatan Tuntang, Kabupaten Semarang, Jawa Tengah</p>
                    <p className="text-gray-500 text-xs">&copy; 2026 Pemerintah Desa. Dikembangkan oleh KKN UNNES GIAT 17.</p>
                </footer>
            </div>
        </>
    );
}