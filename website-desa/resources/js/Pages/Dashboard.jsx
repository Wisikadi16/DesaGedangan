import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    // Menggunakan URL path langsung agar aman 100% dari error Ziggy route name
    const cards = [
        {
            title: 'Kelola Berita',
            description: 'Publikasikan kegiatan desa, pengumuman penting, dan informasi terbaru.',
            icon: '📰',
            url: '/admin/berita',
        },
        {
            title: 'Data UMKM',
            description: 'Bantu warga mempromosikan produk lokal dan kembangkan potensi ekonomi desa.',
            icon: '🛍️',
            url: '/admin/umkm',
        },
        {
            title: 'Profil Desa',
            description: 'Perbarui struktur organisasi, visi misi, data penduduk, dan informasi dusun.',
            icon: '🏛️',
            url: '/admin/profil',
        },
        {
            title: 'Pemerintahan',
            description: 'Kelola data perangkat desa, BPD, LKMD, TPK, PKK, dan RT/RW.',
            icon: '👥',
            url: '/admin/pemerintahan',
        },
        {
            title: 'Wilayah Dusun',
            description: 'Atur daftar dusun, nama kepala dusun, dan data wilayah.',
            icon: '🏘️',
            url: '/admin/dusun',
        },
        {
            title: 'Desa Wisata',
            description: 'Kelola informasi destinasi dan spot wisata menarik di desa.',
            icon: '🌄',
            url: '/admin/desa-wisata',
        },
        {
            title: 'Syarat Pelayanan',
            description: 'Kelola panduan, persyaratan, dan alur pelayanan administrasi warga.',
            icon: '📋',
            url: '/admin/syarat-pelayanan',
        },
        {
            title: 'Layanan SMARD',
            description: 'Kelola informasi fitur layanan digital cerdas desa.',
            icon: '⚡',
            url: '/admin/layanan-smard',
        },
        {
            title: 'Potensi Desa',
            description: 'Tampilkan dan kelola potensi unggulan yang dimiliki desa.',
            icon: '🌱',
            url: '/admin/potensi-desa',
        },
        {
            title: 'Transparansi',
            description: 'Publikasikan laporan APBDes, realisasi anggaran, dan keuangan transparan.',
            icon: '📊',
            url: '/admin/transparansi',
        },
        {
            title: 'Buku Tamu',
            description: 'Pantau pesan masuk, kritik, saran, dan aspirasi dari pengunjung.',
            icon: '📖',
            url: '/admin/buku-tamu',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Utama</h2>}
        >
            <Head title="Dashboard Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-green-600 to-teal-700 overflow-hidden shadow-sm sm:rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-extrabold tracking-tight">👋 Halo, Perangkat Desa!</h1>
                            <p className="text-green-100 text-sm md:text-base max-w-xl font-light">
                                Selamat datang di pusat kendali website Desa Gedangan. Kelola seluruh modul desa dengan mudah dalam satu tempat.
                            </p>
                        </div>
                    </div>

                    {/* Grid Card Menu */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                                <div>
                                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mb-4">
                                        {card.icon}
                                    </div>
                                    <h3 className="font-extrabold text-lg text-gray-900 mb-1">{card.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">{card.description}</p>
                                </div>
                                <Link
                                    href={card.url}
                                    className="inline-flex items-center text-xs font-bold text-green-700 hover:text-green-800"
                                >
                                    Buka Modul →
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}