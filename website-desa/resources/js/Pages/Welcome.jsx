import { Head, Link } from '@inertiajs/react';

export default function Welcome({ profil, berita, auth }) {
    return (
        <>
            <Head title={`Selamat Datang - ${profil?.nama_desa || 'Desa'}`} />
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
                
                {/* Navbar */}
                <nav className="bg-white shadow-md w-full fixed top-0 z-50 h-16">
                    <div className="w-full px-6 lg:px-12 flex justify-between items-center h-full">
                        
                        {/* 1. Logo (Otomatis Kiri) */}
                        <Link href={route('home')} className="font-extrabold text-2xl text-green-700 tracking-wider">
                            {profil?.nama_desa || 'DESA'}
                        </Link>

                        {/* 2. Container Menu & Login (Otomatis Kanan) */}
                        <div className="flex items-center space-x-8 h-full">
                            
                            {/* Menu Navigasi Desktop */}
                            <ul className="hidden lg:flex space-x-6 font-bold text-sm text-gray-700 h-full">
                                <li className="h-full flex items-center"><Link href={route('home')} className="hover:text-green-600 transition">Beranda</Link></li>
                                
                                {/* Dropdown Profil */}
                                <li className="relative group h-full flex items-center">
                                    <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Profil ▾</span>
                                    <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block">
                                        <li><Link href={route('profil.desa')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Profil Desa</Link></li>
                                        <li><Link href={route('profil.pemerintahan')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Pemerintahan</Link></li>
                                        <li><Link href={route('profil.kondisi')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Kondisi Umum</Link></li>
                                        <li><Link href={route('profil.penduduk')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Profil Penduduk</Link></li>
                                        <li><Link href={route('profil.masalah')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Potensi & Masalah</Link></li>
                                        <li><Link href={route('profil.dusun')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Dusun</Link></li>
                                    </ul>
                                </li>

                                <li className="h-full flex items-center"><Link href={route('berita')} className="hover:text-green-600 transition">Berita</Link></li>
                                
                                {/* PERUBAHAN: Menu UMKM Mengarah ke Halaman Khusus Direktori UMKM */}
                                <li className="h-full flex items-center"><Link href={route('umkm.index')} className="hover:text-green-600 transition">UMKM Warga</Link></li>

                                <li className="h-full flex items-center"><Link href={route('wisata')} className="hover:text-green-600 transition">Desa Wisata</Link></li>

                                {/* Dropdown Potensi */}
                                <li className="relative group h-full flex items-center">
                                    <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Potensi ▾</span>
                                    <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block">
                                        <li><Link href={route('potensi.pariwisata')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Pariwisata</Link></li>
                                        <li><Link href={route('potensi.pasar')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Pasar Desa</Link></li>
                                        <li><Link href={route('potensi.kesenian')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Kesenian</Link></li>
                                    </ul>
                                </li>

                                {/* Dropdown Transparansi */}
                                <li className="relative group h-full flex items-center">
                                    <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Transparansi ▾</span>
                                    <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block">
                                        <li><Link href={route('transparansi.apbdes')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">APBDes</Link></li>
                                        <li><Link href={route('transparansi.realisasi')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Realisasi Anggaran</Link></li>
                                    </ul>
                                </li>

                                {/* Dropdown Desa Online */}
                                <li className="relative group h-full flex items-center">
                                    <span className="cursor-pointer hover:text-green-600 transition h-full flex items-center">Desa Online ▾</span>
                                    <ul className="absolute top-full left-0 w-48 bg-white border-t-2 border-green-600 shadow-xl hidden group-hover:block">
                                        <li><Link href={route('online.syarat')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 border-b text-sm">Syarat Pelayanan</Link></li>
                                        <li><Link href={route('online.smard')} className="block px-4 py-3 hover:bg-green-50 hover:text-green-700 text-sm">Layanan SMARD</Link></li>
                                    </ul>
                                </li>

                                <li className="h-full flex items-center"><Link href={route('buku-tamu')} className="hover:text-green-600 transition">Buku Tamu</Link></li>
                                <li className="h-full flex items-center"><Link href={route('kontak')} className="hover:text-green-600 transition">Kontak</Link></li>
                            </ul>

                            {/* Tombol Login */}
                            <div className="h-full flex items-center">
                                {auth.user ? (
                                    <Link href={route('admin.dashboard')} className="px-5 py-2 bg-green-600 text-white text-sm rounded-md font-bold hover:bg-green-700 transition shadow-sm">Panel Admin</Link>
                                ) : (
                                    <Link href={route('login')} className="px-5 py-2 bg-gray-800 text-white text-sm rounded-md font-bold hover:bg-gray-900 transition shadow-sm">Login</Link>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="bg-green-900 text-white text-center py-32 px-4 mt-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Selamat Datang di {profil?.nama_desa || 'Desa Gedangan'}</h2>
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
                                    <img 
                                        src={`/storage/${item.gambar}`} 
                                        alt={item.judul} 
                                        className="h-48 w-full object-cover" 
                                    />
                                ) : (
                                    <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 font-bold">
                                        [TIDAK ADA GAMBAR]
                                    </div>
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

                {/* Footer */}
                <footer className="bg-gray-900 text-white text-center py-10 mt-auto">
                    <h3 className="text-xl font-bold mb-2">{profil?.nama_desa || 'Desa Gedangan'}</h3>
                    <p className="text-gray-400 text-sm mb-4">Kecamatan Tuntang, Kabupaten Semarang, Jawa Tengah</p>
                    <p className="text-gray-500 text-xs">&copy; 2026 Pemerintah Desa. Dikembangkan oleh KKN UNNES GIAT 17.</p>
                </footer>
            </div>
        </>
    );
}