import { Link } from '@inertiajs/react';

export default function PublicLayout({ children, profil, auth }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
            
            {/* Navbar Utama (Disamakan 100% dengan Welcome.jsx) */}
            <nav className="bg-white shadow-md w-full fixed top-0 z-50 h-16">
                <div className="w-full px-6 lg:px-12 flex justify-between items-center h-full">
                    
                    {/* Logo (Otomatis Kiri) */}
                    <Link href={route('home')} className="font-extrabold text-2xl text-green-700 tracking-wider">
                        {profil?.nama_desa || 'DESA GEDANGAN'}
                    </Link>

                    {/* Container Menu & Login (Otomatis Kanan) */}
                    <div className="flex items-center space-x-8 h-full">
                        
                        {/* Menu Navigasi Desktop */}
                        <ul className="hidden lg:flex space-x-6 font-bold text-sm text-gray-700 h-full">
                            <li className="h-full flex items-center"><Link href={route('home')} className="hover:text-green-600 transition">Beranda</Link></li>
                            
                            {/* Dropdown Profil */}
                            <li className="relative group h-full flex items-center">
                                <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Profil ▾</span>
                                <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block z-50">
                                    <li><Link href={route('profil.desa')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Profil Desa</Link></li>
                                    <li><Link href={route('profil.pemerintahan')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Pemerintahan</Link></li>
                                    <li><Link href={route('profil.kondisi')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Kondisi Umum</Link></li>
                                    <li><Link href={route('profil.penduduk')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Profil Penduduk</Link></li>
                                    <li><Link href={route('profil.masalah')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Potensi & Masalah</Link></li>
                                    <li><Link href={route('profil.dusun')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Dusun</Link></li>
                                </ul>
                            </li>

                            <li className="h-full flex items-center"><Link href={route('berita')} className="hover:text-green-600 transition">Berita</Link></li>
                            <li className="h-full flex items-center"><Link href={route('umkm.index')} className="hover:text-green-600 transition">UMKM Warga</Link></li>
                            <li className="h-full flex items-center"><Link href={route('wisata')} className="hover:text-green-600 transition">Desa Wisata</Link></li>

                            {/* Dropdown Potensi */}
                            <li className="relative group h-full flex items-center">
                                <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Potensi ▾</span>
                                <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block z-50">
                                    <li><Link href={route('potensi.pariwisata')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Pariwisata</Link></li>
                                    <li><Link href={route('potensi.pasar')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Pasar Desa</Link></li>
                                    <li><Link href={route('potensi.kesenian')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Kesenian</Link></li>
                                </ul>
                            </li>

                            {/* Dropdown Transparansi */}
                            <li className="relative group h-full flex items-center">
                                <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Transparansi ▾</span>
                                <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block z-50">
                                    <li><Link href={route('transparansi.apbdes')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">APBDes</Link></li>
                                    <li><Link href={route('transparansi.realisasi')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Realisasi Anggaran</Link></li>
                                </ul>
                            </li>

                            {/* Dropdown Desa Online */}
                            <li className="relative group h-full flex items-center">
                                <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Desa Online ▾</span>
                                <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block z-50">
                                    <li><Link href={route('online.syarat')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Syarat Pelayanan</Link></li>
                                    <li><Link href={route('online.smard')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Layanan SMARD</Link></li>
                                </ul>
                            </li>

                            <li className="h-full flex items-center"><Link href={route('buku-tamu')} className="hover:text-green-600 transition">Buku Tamu</Link></li>
                            <li className="h-full flex items-center"><Link href={route('kontak')} className="hover:text-green-600 transition">Kontak</Link></li>
                        </ul>

                        {/* Tombol Login / Admin */}
                        <div className="h-full flex items-center">
                            {auth?.user ? (
                                <Link href={route('admin.dashboard')} className="px-5 py-2 bg-green-600 text-white text-sm rounded-md font-bold hover:bg-green-700 transition shadow-sm">Panel Admin</Link>
                            ) : (
                                <Link href={route('login')} className="px-5 py-2 bg-gray-800 text-white text-sm rounded-md font-bold hover:bg-gray-900 transition shadow-sm">Login</Link>
                            )}
                        </div>
                        
                    </div>
                </div>
            </nav>

            {/* Area Konten Utama (Diberi margin top 16 agar pas di bawah navbar fixed) */}
            <main className="mt-16 flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-10 mt-auto">
                <h3 className="text-xl font-bold mb-2">{profil?.nama_desa || 'Desa Gedangan'}</h3>
                <p className="text-gray-400 text-sm mb-4">Kecamatan Tuntang, Kabupaten Semarang, Jawa Tengah</p>
                <p className="text-gray-500 text-xs">&copy; 2026 Pemerintah Desa. Dikembangkan oleh KKN UNNES GIAT 17.</p>
            </footer>
        </div>
    );
}