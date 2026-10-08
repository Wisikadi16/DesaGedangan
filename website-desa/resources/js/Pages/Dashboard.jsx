import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-extrabold leading-tight text-gray-800 tracking-tight">
                    Dashboard Utama
                </h2>
            }
        >
            <Head title="Dashboard Admin" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Welcome Banner Modern */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-teal-500 shadow-xl sm:rounded-3xl mb-10 border border-green-600/50">
                        {/* Dekorasi Background */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-10 blur-2xl"></div>
                        <div className="absolute bottom-0 right-40 -mb-20 w-48 h-48 rounded-full bg-white opacity-10 blur-xl"></div>
                        
                        <div className="p-8 md:p-12 relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-4xl">👋</span>
                                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                    Halo, Perangkat Desa!
                                </h3>
                            </div>
                            <p className="text-green-50 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                                Selamat datang di pusat kendali website Desa Gedangan. Kelola berita, data UMKM, dan profil desa dengan mudah dalam satu tempat untuk memajukan digitalisasi desa.
                            </p>
                        </div>
                    </div>

                    {/* Grid Menu Cards Modern */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        
                        {/* 1. Berita */}
                        <Link 
                            href={route('admin.berita.index')} 
                            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                📰
                            </div>
                            <h4 className="font-extrabold text-gray-900 text-2xl mb-3 group-hover:text-blue-600 transition-colors">Kelola Berita</h4>
                            <p className="text-base text-gray-500 mb-8 flex-grow leading-relaxed">Publikasikan kegiatan desa, pengumuman penting, dan transparansi anggaran.</p>
                            <div className="flex items-center text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl w-fit group-hover:bg-blue-100 transition-colors">
                                Buka Modul <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </div>
                        </Link>

                        {/* 2. UMKM */}
                        <Link 
                            href={route('admin.umkm.index')} 
                            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                🏪
                            </div>
                            <h4 className="font-extrabold text-gray-900 text-2xl mb-3 group-hover:text-orange-600 transition-colors">Data UMKM</h4>
                            <p className="text-base text-gray-500 mb-8 flex-grow leading-relaxed">Bantu warga mempromosikan produk lokal dan kembangkan potensi ekonomi desa.</p>
                            <div className="flex items-center text-orange-600 font-bold text-sm bg-orange-50 px-4 py-2 rounded-xl w-fit group-hover:bg-orange-100 transition-colors">
                                Buka Modul <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </div>
                        </Link>

                        {/* 3. Profil */}
                        <Link 
                            href={route('admin.profil.index')} 
                            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                🏛️
                            </div>
                            <h4 className="font-extrabold text-gray-900 text-2xl mb-3 group-hover:text-purple-600 transition-colors">Profil Desa</h4>
                            <p className="text-base text-gray-500 mb-8 flex-grow leading-relaxed">Perbarui struktur organisasi, visi misi, data penduduk, dan informasi dusun.</p>
                            <div className="flex items-center text-purple-600 font-bold text-sm bg-purple-50 px-4 py-2 rounded-xl w-fit group-hover:bg-purple-100 transition-colors">
                                Buka Modul <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}