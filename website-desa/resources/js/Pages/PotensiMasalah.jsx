import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PublicHero from '@/Components/PublicHero';
import EmptyState from '@/Components/EmptyState';
import { toLines } from '@/utils/format';

function Daftar({ judul, ikon, isi, warna, kosong }) {
    const butir = toLines(isi);
    return (
        <section className={`bg-white rounded-2xl shadow-sm border-t-4 ${warna.border} border-x border-b border-gray-200 p-6 sm:p-8`}>
            <h3 className={`text-xl font-extrabold mb-5 ${warna.judul}`}>
                {ikon} {judul}
            </h3>
            {butir.length > 0 ? (
                <ul className="space-y-3">
                    {butir.map((teks, i) => (
                        <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                            <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${warna.titik}`} />
                            <span>{teks}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <EmptyState>{kosong}</EmptyState>
            )}
        </section>
    );
}

export default function PotensiMasalah({ profil }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';

    return (
        <>
            <Head title={`Potensi & Masalah - ${namaDesa}`} />
            <PublicHero title="Potensi dan Masalah" subtitle={`Gambaran potensi dan tantangan ${namaDesa}`} />

            <div className="max-w-5xl mx-auto py-12 px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Daftar
                    judul="Potensi Desa"
                    ikon="🌱"
                    isi={profil?.potensi}
                    warna={{ border: 'border-t-green-600', judul: 'text-green-700', titik: 'bg-green-500' }}
                    kosong="Data potensi desa sedang dilengkapi."
                />
                <Daftar
                    judul="Masalah dan Tantangan"
                    ikon="⚠️"
                    isi={profil?.masalah}
                    warna={{ border: 'border-t-amber-500', judul: 'text-amber-700', titik: 'bg-amber-500' }}
                    kosong="Data masalah dan tantangan sedang dilengkapi."
                />
            </div>
        </>
    );
}

PotensiMasalah.layout = (page) => <PublicLayout>{page}</PublicLayout>;
