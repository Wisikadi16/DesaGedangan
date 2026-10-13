import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PublicHero from '@/Components/PublicHero';
import EmptyState from '@/Components/EmptyState';

export default function Pemerintahan({ profil, perangkat }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    // Pastikan perangkat berupa array
    const daftarPerangkat = perangkat || [];

    return (
        <>
            <Head title={`Pemerintahan - ${namaDesa}`} />
            <PublicHero title="Pemerintahan Desa" subtitle={`Struktur Organisasi dan Aparatur ${namaDesa}`} />

            <div className="max-w-5xl mx-auto py-12 px-4 w-full">
                <section>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-8 pb-3 border-b border-gray-200 text-center">
                        Aparatur Pemerintah Desa
                    </h3>

                    {daftarPerangkat.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {daftarPerangkat.map((p, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                        {p.foto_path ? (
                                            <img src={`/storage/${p.foto_path}`} alt={p.nama} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-6xl">👨‍💼</span>
                                        )}
                                    </div>
                                    <div className="p-5 text-center">
                                        <h4 className="font-extrabold text-gray-900 text-lg mb-1">{p.nama}</h4>
                                        <p className="text-green-700 font-bold text-sm bg-green-50 inline-block px-3 py-1 rounded-full">
                                            {p.jabatan}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState>Data struktur organisasi dan perangkat desa sedang disiapkan.</EmptyState>
                    )}
                </section>
            </div>
        </>
    );
}

Pemerintahan.layout = (page) => <PublicLayout>{page}</PublicLayout>;