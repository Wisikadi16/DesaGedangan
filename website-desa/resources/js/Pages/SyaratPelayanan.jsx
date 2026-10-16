import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function SyaratPelayanan({ profil, auth, syaratPelayanans }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Syarat Pelayanan Administrasi - ${namaDesa}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans pb-20">
                
                {/* HERO SECTION */}
                <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white text-center py-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative max-w-3xl mx-auto space-y-3">
                        <span className="bg-green-700/60 text-green-200 border border-green-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Desa Online & Administrasi
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Syarat Pelayanan Administrasi</h1>
                        <p className="text-green-100 text-sm md:text-base font-light">
                            Pemerintah Desa Gedangan, Kecamatan Tuntang, Kabupaten Semarang
                        </p>
                    </div>
                </div>

                {/* KONTEN DAFTAR PERSYARATAN (DINAMIS DARI DATABASE ADMIN) */}
                <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {(!syaratPelayanans || syaratPelayanans.length === 0) ? (
                            <div className="md:col-span-2 bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                                <p className="text-gray-500 italic">Belum ada data persyaratan pelayanan yang diinput oleh admin.</p>
                            </div>
                        ) : (
                            syaratPelayanans.map((layanan) => (
                                <div key={layanan.id} className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-xl transition duration-300 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                            <span className="text-3xl p-3 bg-green-50 rounded-2xl">{layanan.ikon || '📄'}</span>
                                            <h3 className="text-lg font-extrabold text-gray-900 leading-snug">
                                                {layanan.judul_layanan}
                                            </h3>
                                        </div>

                                        <ul className="space-y-3 text-sm text-gray-600">
                                            {layanan.daftar_syarat.split('\n').map((item, idx) => (
                                                item.trim() !== '' && (
                                                    <li key={idx} className="flex items-start gap-2.5">
                                                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}