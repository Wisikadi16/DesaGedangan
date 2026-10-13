import { Link } from '@inertiajs/react';

export default function PublicLayout({ children, profil }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
            
            {/* Navbar Terpusat */}
            <nav className="bg-white shadow-sm w-full fixed top-0 z-50 h-16 border-b border-gray-200">
                <div className="w-full px-6 lg:px-12 flex justify-between items-center h-full">
                    <Link href={route('home')} className="font-extrabold text-2xl text-green-700 tracking-wider">
                        {profil?.nama_desa || 'DESA GEDANGAN'}
                    </Link>
                    <div className="flex items-center space-x-8 h-full">
                        <ul className="hidden lg:flex space-x-6 font-bold text-sm text-gray-700 h-full">
                            <li className="h-full flex items-center"><Link href={route('home')} className="hover:text-green-600 transition">Beranda</Link></li>
                            <li className="h-full flex items-center"><Link href={route('profil.desa')} className="text-green-600 transition">Profil</Link></li>
                            <li className="h-full flex items-center"><Link href={route('berita')} className="hover:text-green-600 transition">Berita</Link></li>
                            <li className="h-full flex items-center"><Link href={route('umkm.index')} className="hover:text-green-600 transition">UMKM Warga</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Area Konten Utama yang Dinamis */}
            <main className="mt-16 flex-grow">
                {children}
            </main>

            {/* Footer Terpusat */}
            <footer className="bg-gray-900 text-white text-center py-10 mt-12">
                <h3 className="text-xl font-bold mb-2">{profil?.nama_desa || 'Desa Gedangan'}</h3>
                <p className="text-gray-400 text-sm mb-4">Kecamatan Tuntang, Kabupaten Semarang, Jawa Tengah</p>
                <p className="text-gray-500 text-xs">&copy; 2026 Pemerintah Desa. Dikembangkan oleh KKN UNNES GIAT 17.</p>
            </footer>
        </div>
    );
}