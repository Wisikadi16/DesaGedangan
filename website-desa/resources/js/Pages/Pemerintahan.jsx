import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PublicHero from '@/Components/PublicHero';
import EmptyState from '@/Components/EmptyState';

const inisial = (nama) =>
    (nama || '?')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((kata) => kata[0].toUpperCase())
        .join('');

function Kartu({ item }) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden text-center h-full flex flex-col">
            {item.foto ? (
                <img
                    src={`/storage/${item.foto}`}
                    alt={item.nama}
                    loading="lazy"
                    className="w-full aspect-[3/4] object-cover"
                />
            ) : (
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center text-white text-6xl font-extrabold">
                    {inisial(item.nama)}
                </div>
            )}
            <div className="p-5 flex-grow">
                <h3 className="font-bold text-lg text-gray-900 leading-snug">{item.nama}</h3>
                <p className="text-green-700 font-semibold text-sm mt-1">{item.jabatan}</p>
                {item.deskripsi && <p className="text-gray-500 text-sm mt-3">{item.deskripsi}</p>}
                {item.telepon && <p className="text-gray-600 text-sm mt-3">📞 {item.telepon}</p>}
            </div>
        </div>
    );
}

export default function Pemerintahan({ profil, perangkat }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    const [pimpinan, ...lainnya] = perangkat || [];

    return (
        <>
            <Head title={`Pemerintahan - ${namaDesa}`} />
            <PublicHero title="Pemerintahan Desa" subtitle={`Perangkat pemerintahan ${namaDesa}`} />

            <div className="max-w-6xl mx-auto py-12 px-4 w-full">
                {!pimpinan ? (
                    <EmptyState>Data perangkat desa sedang dilengkapi.</EmptyState>
                ) : (
                    <>
                        {/* Perangkat dengan urutan pertama ditampilkan paling menonjol */}
                        <div className="flex justify-center mb-10">
                            <div className="w-64 sm:w-72">
                                <Kartu item={pimpinan} />
                            </div>
                        </div>

                        {lainnya.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                                {lainnya.map((item) => (
                                    <Kartu key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

Pemerintahan.layout = (page) => <PublicLayout>{page}</PublicLayout>;
