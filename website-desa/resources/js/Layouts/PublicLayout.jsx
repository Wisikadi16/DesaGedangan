import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicLayout({ children, profil }) {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
            
            {/* Navbar Utama */}
            <nav className="bg-white shadow-md w-full fixed top-0 z-50 h-16">
                {/* Diubah menggunakan max-w-7xl dan mx-auto agar posisinya pas di tengah dan tidak mentok */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                    
                    {/* Logo */}
                    <Link href={route('home')} className="font-extrabold text-lg sm:text-xl lg:text-2xl text-green-700 tracking-wider z-50 shrink-0 truncate max-w-[200px] sm:max-w-xs">
                        {profil?.nama_desa || 'DESA GEDANGAN'}
                    </Link>

                    {/* --- MENU DESKTOP --- */}
                    <div className="hidden xl:flex items-center space-x-6 h-full">
                        <ul className="flex space-x-5 font-bold text-[13px] text-gray-700 h-full">
                            <li className="h-full flex items-center"><Link href={route('home')} className="hover:text-green-600 transition">Beranda</Link></li>
                            
                            {/* Dropdown Profil */}
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

                            {/* Transparansi */}
                            <li className="h-full flex items-center">
                                <Link href={route('transparansi.index')} className="hover:text-green-600 transition">Transparansi</Link>
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
                        </ul>

                        {/* Tombol Login / Panel Admin Desktop */}
                        <div className="h-full flex items-center">
                            {auth?.user ? (
                                <Link href={route('admin.dashboard')} className="px-5 py-2 bg-green-600 text-white text-sm rounded-md font-bold hover:bg-green-700 transition shadow-sm">Panel Admin</Link>
                            ) : (
                                <Link href="/login" className="px-5 py-2 bg-gray-800 text-white text-sm rounded-md font-bold hover:bg-gray-900 transition shadow-sm">Login</Link>
                            )}
                        </div>
                    </div>

                    {/* --- TOMBOL HAMBURGER (MOBILE) --- */}
                    <div className="xl:hidden flex items-center z-50">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100">
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

                        <Link href={route('transparansi.index')} className="block py-2 text-gray-700 border-t border-gray-100" onClick={() => setIsOpen(false)}>Transparansi</Link>

                        <div className="py-2 border-t border-gray-100 space-y-1">
                            <span className="text-xs uppercase tracking-wider text-green-700 font-bold block mb-1">Desa Online</span>
                            <div className="pl-3 flex flex-col space-y-1 text-xs">
                                <Link href={route('online.syarat')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Syarat Pelayanan</Link>
                                <Link href={route('online.smard')} onClick={() => setIsOpen(false)} className="text-gray-600 py-1 block">Layanan SMARD</Link>
                            </div>
                        </div>

                        <Link href={route('buku-tamu')} className="block py-2 text-gray-700 border-t border-gray-100" onClick={() => setIsOpen(false)}>Buku Tamu</Link>
                        
                        <div className="pt-3 border-t border-gray-100 pb-4">
                            {auth?.user ? (
                                <Link href={route('admin.dashboard')} className="block text-center py-2.5 bg-green-600 text-white rounded-md font-bold text-xs" onClick={() => setIsOpen(false)}>Panel Admin</Link>
                            ) : (
                                <Link href="/login" className="block text-center py-2.5 bg-gray-800 text-white rounded-md font-bold text-xs" onClick={() => setIsOpen(false)}>Login</Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Area Konten Utama */}
            <main className="mt-16 flex-grow">
                {children}
            </main>

            {/* --- FOOTER UTUH --- */}
            <footer className="bg-[#333333] text-gray-300 pt-12 pb-6 px-4 lg:px-16 mt-auto border-t-4 border-gray-700">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
                    
                    {/* Kolom 1: TENTANG */}
                    <div>
                        <h4 className="text-white font-bold tracking-wider text-sm uppercase mb-4 pb-2 border-b-2 border-red-600 inline-block">
                            TENTANG
                        </h4>
                        <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                            <p>
                                <span className="text-red-500 font-bold text-base">gedangan.desa.id</span> adalah media online Desa Gedangan yang bertujuan sebagai sarana informasi digital bagi masyarakat Desa Gedangan Kecamatan Tuntang Kabupaten Semarang agar lebih mengenal dan mengetahui berbagai situasi di Desa Gedangan. Media ini dikelola oleh Pemerintah Desa Gedangan dan ingin menyediakan tempat warga masyarakat Desa Gedangan agar bisa berbagi informasi tentang apa yang ada di desanya.
                            </p>
                        </div>
                    </div>

                    {/* Kolom 2: REDAKSI */}
                    <div>
                        <h4 className="text-white font-bold tracking-wider text-sm uppercase mb-4 pb-2 border-b-2 border-red-600 inline-block">
                            REDAKSI
                        </h4>
                        <div className="space-y-1.5 text-xs text-gray-300 leading-relaxed">
                            <p><strong className="text-white">Penanggung Jawab :</strong> Seketaris Kecamatan : Zakiyah Farida, SE., MSi</p>
                            <p><strong className="text-white">Alamat Redaksi :</strong> Jl. Salatiga - Banyubiru Desa Gedangan Kec. Tuntang Kab. Semarang Jawa Tengah 50773</p>
                            <p><strong className="text-white">Telephone:</strong> (0298) 6031115</p>
                            <p><strong className="text-white">Email:</strong> pemerintahdesagedangan@gmail.com</p>
                            <p><strong className="text-white">Website:</strong> http://gedangan.desa.id</p>
                            <p><strong className="text-white">Admin :</strong> Wachid Nuryadi</p>
                        </div>
                    </div>

                </div>

                {/* Copyright Bawah */}
                <div className="max-w-7xl mx-auto pt-6 border-t border-gray-700 text-center text-xs text-gray-400">
                © 2026 Pemerintah Desa Gedangan. Hak Cipta Dilindungi.  
                Dikembangkan oleh Tim Pengembang Website Desa Gedangan & Mahasiswa KKN UNNES GIAT 17 Desa Gedangan .                
                </div>
            </footer>
        </div>
    );
}