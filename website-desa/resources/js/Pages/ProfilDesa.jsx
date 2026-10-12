import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ProfilDesa({ profil }) {
    // State untuk mengatur tab aktif di sidebar
    const [activeTab, setActiveTab] = useState('sejarah');

    return (
        <>
            <Head title={`Profil Desa - ${profil?.nama_desa || 'Desa Gedangan'}`} />
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
                
                {/* Navbar Atas */}
                <nav className="bg-white shadow-sm w-full fixed top-0 z-50 h-16 border-b border-gray-200">
                    <div className="w-full px-6 lg:px-12 flex justify-between items-center h-full">
                        <Link href={route('home')} className="font-extrabold text-2xl text-green-700 tracking-wider flex items-center gap-2">
                            <span></span> {profil?.nama_desa || 'DESA GEDANGAN'}
                        </Link>
                        <div className="flex items-center space-x-8 h-full">
                            <ul className="hidden lg:flex space-x-6 font-bold text-sm text-gray-700 h-full">
                                <li className="h-full flex items-center"><Link href={route('home')} className="hover:text-green-600 transition">Beranda</Link></li>
                                <li className="h-full flex items-center"><Link href={route('profil.desa')} className="text-green-600 border-b-2 border-green-600 h-full flex items-center">Profil Desa</Link></li>
                                <li className="h-full flex items-center"><Link href={route('berita')} className="hover:text-green-600 transition">Berita</Link></li>
                                <li className="h-full flex items-center"><Link href={route('umkm.index')} className="hover:text-green-600 transition">UMKM Warga</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Main Layout Container (Sidebar Kiri & Konten Kanan) */}
                <div className="max-w-7xl mx-auto w-full pt-28 pb-16 px-4 lg:px-8 flex-grow">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        
                        {/* SIDEBAR MENU KIRI */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 space-y-1 sticky top-24">
                                <button
                                    onClick={() => setActiveTab('sejarah')}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm transition ${
                                        activeTab === 'sejarah' 
                                            ? 'bg-green-800 text-white shadow-sm' 
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Sejarah Desa
                                </button>
                                <button
                                    onClick={() => setActiveTab('visi-misi')}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm transition ${
                                        activeTab === 'visi-misi' 
                                            ? 'bg-green-800 text-white shadow-sm' 
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Visi dan Misi
                                </button>
                                <button
                                    onClick={() => setActiveTab('struktur')}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm transition ${
                                        activeTab === 'struktur' 
                                            ? 'bg-green-800 text-white shadow-sm' 
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Struktur Organisasi
                                </button>
                                <button
                                    onClick={() => setActiveTab('demografi')}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm transition ${
                                        activeTab === 'demografi' 
                                            ? 'bg-green-800 text-white shadow-sm' 
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Demografi & Wilayah
                                </button>
                            </div>
                        </div>

                        {/* KONTEN UTAMA KANAN (Clean & Wide) */}
                        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-10">
                            
                            {/* TAB 1: SEJARAH DESA */}
                            {activeTab === 'sejarah' && (
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                                        Sejarah Desa
                                    </h2>
                                    
                                    {/* Gambar Ilustrasi / Banner Desa */}
                                    <div className="mb-8 rounded-xl overflow-hidden shadow-sm max-h-[400px] bg-gray-100">
                                        <div className="w-full h-72 bg-gradient-to-r from-green-700 to-teal-800 flex items-center justify-center text-white text-xl font-semibold">
                                            🌄 Panorama & Wilayah {profil?.nama_desa || 'Desa Gedangan'}
                                        </div>
                                    </div>

                                    <div className="prose max-w-none text-gray-700 leading-relaxed text-base space-y-4">
                                        <p>
                                            {profil?.deskripsi || `${profil?.nama_desa || 'Desa Gedangan'} memiliki sejarah yang kaya dan membentuk karakternya hingga saat ini. Kehidupan masyarakat desa ini telah melewati berbagai fase perkembangan, baik dari aspek sosial, ekonomi, maupun administratif, yang menjadikannya sebuah entitas dengan identitas khas.`}
                                        </p>
                                        <p>
                                            Pembentukan desa sebagai unit pemerintahan tidak lepas dari peran penting para sesepuh dan tokoh masyarakat yang visioner. Merekalah yang meletakkan dasar-dasar tata kelola desa dan kehidupan bermasyarakat, dengan kepemimpinan tradisional yang sangat dihormati dan menjadi pusat musyawarah.
                                        </p>
                                        <p>
                                            Seiring berjalannya waktu, desa terus menunjukkan dinamika positif. Mayoritas penduduk menggantungkan hidupnya pada sektor pertanian, perkebunan, dan UMKM, yang secara turun-temurun menjadi penopang utama perekonomian lokal.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: VISI DAN MISI */}
                            {activeTab === 'visi-misi' && (
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                                        Visi dan Misi
                                    </h2>
                                    
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">
                                                🎯 Visi Desa
                                            </h3>
                                            <p className="text-gray-800 text-lg italic bg-green-50 p-5 rounded-xl border-l-4 border-green-600">
                                                {profil?.visi || '"Terwujudnya Desa Gedangan yang mandiri, transparan, religius, dan sejahtera berbasis potensi lokal serta teknologi."'}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                                                🚀 Misi Desa
                                            </h3>
                                            <ul className="space-y-3 text-gray-700 list-disc list-inside bg-gray-50 p-6 rounded-xl border border-gray-200">
                                                <li>Meningkatkan kualitas pelayanan publik berbasis digital dan transparan.</li>
                                                <li>Mengembangkan sektor pertanian, perkebunan, dan UMKM warga secara berkelanjutan.</li>
                                                <li>Memperkuat infrastruktur desa yang merata dan berwawasan lingkungan.</li>
                                                <li>Meningkatkan kerukunan sosial, budaya, dan keagamaan di tengah masyarakat.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: STRUKTUR ORGANISASI */}
                            {activeTab === 'struktur' && (
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                                        Struktur Organisasi Pemerintahan
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        Berikut adalah susunan perangkat Desa Gedangan yang bertugas melayani warga masyarakat secara profesional dan berintegritas.
                                    </p>

                                    {/* Contoh Card Bagan Sederhana */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-5 rounded-xl border border-green-200 text-center">
                                            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-sm">
                                                👨‍💼
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-lg">Kepala Desa</h4>
                                            <p className="text-sm text-green-700 font-medium">Pemerintahan Desa Gedangan</p>
                                        </div>

                                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 text-center">
                                            <div className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-sm">
                                                📄
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-lg">Sekretaris Desa</h4>
                                            <p className="text-sm text-gray-600 font-medium">Administrasi & Kesekretariatan</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 4: DEMOGRAFI */}
                            {activeTab === 'demografi' && (
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                                        Demografi & Kondisi Wilayah
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        Desa Gedangan terdiri dari beberapa dusun yang saling terhubung harmonis, di antaranya Dusun Bandungan, Dusun Jaten, Dusun Bendo, dan wilayah sekitarnya. Wilayah ini dikelilingi oleh area pertanian yang subur serta potensi lokal yang aktif dikembangkan oleh warga.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                            <span className="block text-2xl font-extrabold text-green-700 mb-1">7+</span>
                                            <span className="text-sm text-gray-600 font-medium">Dusun / Wilayah</span>
                                        </div>
                                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                            <span className="block text-2xl font-extrabold text-green-700 mb-1">Pertanian & UMKM</span>
                                            <span className="text-sm text-gray-600 font-medium">Mata Pencaharian Utama</span>
                                        </div>
                                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                            <span className="block text-2xl font-extrabold text-green-700 mb-1">Tuntang</span>
                                            <span className="text-sm text-gray-600 font-medium">Kecamatan</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white text-center py-10">
                    <h3 className="text-xl font-bold mb-2">{profil?.nama_desa || 'Desa Gedangan'}</h3>
                    <p className="text-gray-400 text-sm mb-4">Kecamatan Tuntang, Kabupaten Semarang, Jawa Tengah</p>
                    <p className="text-gray-500 text-xs">&copy; 2026 Pemerintah Desa. Dikembangkan oleh KKN UNNES GIAT 17.</p>
                </footer>
            </div>
        </>
    );
}