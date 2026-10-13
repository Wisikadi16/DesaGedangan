import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PublicHero from '@/Components/PublicHero';
import EmptyState from '@/Components/EmptyState';

export default function Dusun({ profil, dusun }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    const daftarDusun = dusun || [];

    return (
        <>
            <Head title={`Data Dusun - ${namaDesa}`} />
            <PublicHero title="Wilayah Dusun" subtitle={`Pembagian Wilayah Administrasi ${namaDesa}`} />

            <div className="max-w-4xl mx-auto py-12 px-4 w-full">
                <section>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                        Daftar Dusun
                    </h3>

                    {daftarDusun.length > 0 ? (
                        <div className="space-y-4">
                            {daftarDusun.map((d, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-green-300 transition">
                                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-extrabold text-xl shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-xl font-bold text-gray-900">{d.nama_dusun}</h4>
                                        {d.nama_kepala_dusun && (
                                            <p className="text-green-700 font-medium text-sm mt-1">
                                                Kepala Dusun: {d.nama_kepala_dusun}
                                            </p>
                                        )}
                                        {d.deskripsi && (
                                            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                                                {d.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState>Data wilayah kedusunan sedang dilengkapi oleh pemerintah desa.</EmptyState>
                    )}
                </section>
            </div>
        </>
    );
}

Dusun.layout = (page) => <PublicLayout>{page}</PublicLayout>;