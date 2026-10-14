import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicLayout({ children, profil, auth }) {
    // State untuk membuka/menutup menu di HP
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
            
            {/* Navbar Utama */}
            <nav className="bg-white shadow-md w-full fixed top-0 z-50 h-16">
                <div className="w-full px-4 lg:px-8 flex justify-between items-center h-full">
                    
                    {/* Logo */}
                    <Link href={route('home')} className="font-extrabold text-xl lg:text-2xl text-green-700 tracking-wider z-50 shrink-0">
                        {profil?.nama_desa || 'DESA GEDANGAN'}
                    </Link>

                    {/* --- MENU DESKTOP --- */}
                    <div className="hidden xl:flex items-center space-x-6 h-full">
                        <ul className="flex space-x-5 font-bold text-[13px] text-gray-700 h-full">
                            <li className="h-full flex items-center"><Link href={route('home')} className="hover:text-green-600 transition">Beranda</Link></li>
                            
                            {/* Dropdown Profil (Diarahkan ke /profil#id) */}
                            <li className="relative group h-full flex items-center">
                                <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Profil ▾</span>
                                <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block z-50">
                                    <li><a href="/profil#sejarah" className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Profil Desa</a></li>
                                    <li><a href="/profil#pemerintahan" className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Pemerintahan</a></li>
                                    <li><a href="/profil#kondisi" className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Kondisi Umum</a></li>
                                    <li><a href="/profil#penduduk" className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Profil Penduduk</a></li>
                                    <li><a href="/profil#masalah" className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Potensi & Masalah</a></li>
                                    <li><a href="/profil#dusun" className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Dusun</a></li>
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

                        {/* Tombol Login Desktop */}
                        <div className="h-full flex items-center">
                            {auth?.user ? (
                                <Link href={route('admin.dashboard')} className="px-5 py-2 bg-green-600 text-white text-sm rounded-md font-bold hover:bg-green-700 transition shadow-sm">Panel Admin</Link>
                            ) : (
                                <Link href={route('login')} className="px-5 py-2 bg-gray-800 text-white text-sm rounded-md font-bold hover:bg-gray-900 transition shadow-sm">Login</Link>
                            )}
                        </div>
                    </div>

                    {/* --- TOMBOL HAMBURGER (MOBILE) --- */}
                    <div className="xl:hidden flex items-center z-50">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* --- MENU DROPDOWN (MOBILE) --- */}
                {isOpen && (
                    <div className="xl:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 px-6 py-4 space-y-3 font-semibold text-sm shadow-xl max-h-[85vh] overflow-y-auto z-40">
                        <Link href={route('home')} className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>Beranda</Link>
                        
                        <div className="py-2 border-t border-gray-100 space-y-1">
                            <span className="text-xs uppercase tracking-wider text-green-700 font-bold block mb-1">Profil Desa</span>
                            <div className="pl-3 flex flex-col space-y-1 text-xs">
                                {/* Diarahkan ke /profil#id */}
                                <a href="/profil#sejarah" onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Profil Desa</a>
                                <a href="/profil#pemerintahan" onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Pemerintahan</a>
                                <a href="/profil#kondisi" onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Kondisi Umum</a>
                                <a href="/profil#penduduk" onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Profil Penduduk</a>
                                <a href="/profil#masalah" onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Potensi & Masalah</a>
                                <a href="/profil#dusun" onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Dusun</a>
                            </div>
                        </div>

                        <Link href={route('berita')} className="block py-2 text-gray-700 border-t border-gray-100" onClick={() => setIsOpen(false)}>Berita</Link>
                        <Link href={route('umkm.index')} className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>UMKM Warga</Link>
                        <Link href={route('wisata')} className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>Desa Wisata</Link>

                        <div className="py-2 border-t border-gray-100 space-y-1">
                            <span className="text-xs uppercase tracking-wider text-green-700 font-bold block mb-1">Potensi</span>
                            <div className="pl-3 flex flex-col space-y-1 text-xs">
                                <Link href={route('potensi.pariwisata')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Pariwisata</Link>
                                <Link href={route('potensi.pasar')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Pasar Desa</Link>
                                <Link href={route('potensi.kesenian')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Kesenian</Link>
                            </div>
                        </div>

                        <div className="py-2 border-t border-gray-100 space-y-1">
                            <span className="text-xs uppercase tracking-wider text-green-700 font-bold block mb-1">Transparansi</span>
                            <div className="pl-3 flex flex-col space-y-1 text-xs">
                                <Link href={route('transparansi.apbdes')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Laporan APBDes</Link>
                                <Link href={route('transparansi.realisasi')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Realisasi Anggaran</Link>
                            </div>
                        </div>

                        <div className="py-2 border-t border-gray-100 space-y-1">
                            <span className="text-xs uppercase tracking-wider text-green-700 font-bold block mb-1">Desa Online</span>
                            <div className="pl-3 flex flex-col space-y-1 text-xs">
                                <Link href={route('online.syarat')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Syarat Pelayanan</Link>
                                <Link href={route('online.smard')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Layanan SMARD</Link>
                            </div>
                        </div>

                        <Link href={route('buku-tamu')} className="block py-2 text-gray-700 border-t border-gray-100" onClick={() => setIsOpen(false)}>Buku Tamu</Link>
                        <Link href={route('kontak')} className="block py-2 text-gray-700" onClick={() => setIsOpen(false)}>Kontak</Link>
                        
                        <div className="pt-3 border-t border-gray-100 pb-4">
                            {auth?.user ? (
                                <Link href={route('admin.dashboard')} className="block text-center py-2.5 bg-green-600 text-white rounded-md font-bold text-xs" onClick={() => setIsOpen(false)}>Panel Admin</Link>
                            ) : (
                                <Link href={route('login')} className="block text-center py-2.5 bg-gray-800 text-white rounded-md font-bold text-xs" onClick={() => setIsOpen(false)}>Login</Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Area Konten Utama */}
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