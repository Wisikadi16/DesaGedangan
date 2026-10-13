import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PublicHero from '@/Components/PublicHero';
import EmptyState from '@/Components/EmptyState';

export default function ProfilDesa({ profil }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';

    return (
        <>
            <Head title={`Profil Desa - ${namaDesa}`} />
            
            {/* Header Banner seragam dengan halaman lain */}
            <PublicHero title="Profil Desa" subtitle={`Sejarah, Visi, dan Misi ${namaDesa}`} />

            <div className="max-w-5xl mx-auto py-12 px-4 w-full space-y-12">
                
                {/* --- BAGIAN 1: SEJARAH --- */}
                <section>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Sejarah Desa
                    </h3>
                    {profil?.sejarah ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                            {profil.sejarah}
                        </div>
                    ) : (
                        <EmptyState>Sejarah desa sedang dilengkapi oleh pemerintah desa.</EmptyState>
                    )}
                </section>

                {/* --- BAGIAN 2: VISI & MISI --- */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Visi */}
                    <div>
                        <h3 className="text-2xl font-extrabold text-green-700 mb-4 flex items-center gap-2">
                            🎯 Visi
                        </h3>
                        {profil?.visi ? (
                            <div className="bg-green-50 rounded-2xl shadow-sm border border-green-200 p-6 text-gray-800 text-lg italic leading-relaxed h-full">
                                "{profil.visi}"
                            </div>
                        ) : (
                            <EmptyState>Visi desa belum ditambahkan.</EmptyState>
                        )}
                    </div>

                    {/* Misi */}
                    <div>
                        <h3 className="text-2xl font-extrabold text-green-700 mb-4 flex items-center gap-2">
                            🚀 Misi
                        </h3>
                        {profil?.misi ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-gray-700 leading-relaxed whitespace-pre-line h-full">
                                {profil.misi}
                            </div>
                        ) : (
                            <EmptyState>Misi desa belum ditambahkan.</EmptyState>
                        )}
                    </div>
                </section>

            </div>
        </>
    );
}

// Gunakan Layout Terpusat agar Navbar & Footer otomatis muncul
ProfilDesa.layout = (page) => <PublicLayout>{page}</PublicLayout>;