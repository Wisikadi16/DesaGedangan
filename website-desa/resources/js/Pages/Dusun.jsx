import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PublicHero from '@/Components/PublicHero';
import EmptyState from '@/Components/EmptyState';
import { formatAngka } from '@/utils/format';

export default function Dusun({ profil, dusun }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    const daftar = dusun || [];
    const totalPenduduk = daftar.reduce((jumlah, d) => jumlah + Number(d.jumlah_penduduk || 0), 0);

    return (
        <>
            <Head title={`Dusun - ${namaDesa}`} />
            <PublicHero
                title="Dusun"
                subtitle={daftar.length > 0 ? `${daftar.length} dusun di ${namaDesa}` : `Wilayah dusun ${namaDesa}`}
            />

            <div className="max-w-6xl mx-auto py-12 px-4 w-full">
                {daftar.length === 0 ? (
                    <EmptyState>Data dusun sedang dilengkapi.</EmptyState>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {daftar.map((d) => (
                                <div key={d.id} className="bg-white rounded-2xl shadow-md border-t-4 border-green-600 p-6 flex flex-col">
                                    <h3 className="text-xl font-extrabold text-gray-900">{d.nama_dusun}</h3>

                                    <dl className="mt-4 space-y-2 text-sm">
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-gray-500">Kepala Dusun</dt>
                                            <dd className="font-semibold text-gray-800 text-right">{d.nama_kepala_dusun || '-'}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-gray-500">Jumlah Penduduk</dt>
                                            <dd className="font-semibold text-green-700">{formatAngka(d.jumlah_penduduk)} jiwa</dd>
                                        </div>
                                    </dl>

                                    {d.alamat && <p className="mt-4 text-sm text-gray-600">📍 {d.alamat}</p>}
                                    {d.deskripsi && <p className="mt-3 text-sm text-gray-500 leading-relaxed">{d.deskripsi}</p>}
                                </div>
                            ))}
                        </div>

                        {totalPenduduk > 0 && (
                            <p className="text-center text-gray-600 mt-8">
                                Total penduduk seluruh dusun: <strong className="text-green-700">{formatAngka(totalPenduduk)} jiwa</strong>
                            </p>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

Dusun.layout = (page) => <PublicLayout>{page}</PublicLayout>;
