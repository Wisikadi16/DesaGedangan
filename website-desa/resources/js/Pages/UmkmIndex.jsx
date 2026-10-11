import { Head, Link } from '@inertiajs/react';

export default function UmkmIndex({ profil, umkm, auth }) {
    return (
        <>
            <Head title={`Direktori UMKM - ${profil?.nama_desa || 'Desa Gedangan'}`} />
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
                
                {/* Navbar Seragam (Sama persis seperti halaman Welcome) */}
                <nav className="bg-white shadow-md w-full fixed top-0 z-50 h-16">
                    <div className="w-full px-6 lg:px-12 flex justify-between items-center h-full">
                        
                        {/* 1. Logo */}
                        <Link href={route('home')} className="font-extrabold text-2xl text-green-700 tracking-wider">
                            {profil?.nama_desa || 'DESA'}
                        </Link>

                        {/* 2. Container Menu & Login */}
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
                                <li className="h-full flex items-center"><Link href={route('umkm.index')} className="text-green-600 transition">UMKM Warga</Link></li>
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

                {/* Header Banner */}
                <div className="bg-gradient-to-r from-green-800 to-teal-700 text-white text-center py-20 px-4 mt-16">
                    <h2 className="text-4xl font-extrabold mb-3">Direktori UMKM & Produk Warga</h2>
                    <p className="text-green-100 max-w-2xl mx-auto text-lg">
                        Dukung pertumbuhan ekonomi lokal dengan berbelanja langsung ke produk-produk unggulan warga Desa Gedangan.
                    </p>
                </div>

                {/* Konten Daftar UMKM */}
                <div className="max-w-7xl mx-auto py-12 px-4 flex-grow w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {umkm && umkm.length > 0 ? (
                            umkm.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-xl transition duration-300">
                                    
                                    {/* Render Gambar UMKM jika ada, jika tidak pakai placeholder */}
                                    <div className="h-44 bg-green-600 flex items-center justify-center text-white text-3xl font-bold relative overflow-hidden">
                                        {item.gambar ? (
                                            <img 
                                                src={`/storage/${item.gambar}`} 
                                                alt={item.nama_umkm} 
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            <span>🏪 {item.nama_umkm?.charAt(0) || 'U'}</span>
                                        )}
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-xl text-gray-900 mb-1">{item.nama_umkm}</h4>
                                            <p className="text-sm text-gray-500 mb-2 font-medium">👤 Pemilik: {item.pemilik}</p>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.deskripsi}</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded">
                                                📞 {item.whatsapp || '-'}
                                            </span>
                                            {item.whatsapp && (
                                                <a 
                                                    href={`https://wa.me/${item.whatsapp}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="bg-green-600 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition shadow-sm"
                                                >
                                                    Chat WhatsApp
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg italic">Belum ada data UMKM yang terdaftar saat ini.</p>
                            </div>
                        )}
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