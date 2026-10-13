import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PublicHero from '@/Components/PublicHero';
import EmptyState from '@/Components/EmptyState';

function Info({ label, value }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">{label}</p>
            <p className="text-lg font-extrabold text-green-700">{value || '-'}</p>
        </div>
    );
}

function Arah({ label, value }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-center h-full flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wider text-green-700 font-bold">{label}</p>
            <p className="text-sm text-gray-800 font-semibold mt-1">{value || '-'}</p>
        </div>
    );
}

export default function KondisiUmum({ profil }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    const adaBatas = ['batas_utara', 'batas_selatan', 'batas_timur', 'batas_barat'].some((k) => profil?.[k]);
    const adaLokasi = profil?.latitude && profil?.longitude;

    return (
        <>
            <Head title={`Kondisi Umum - ${namaDesa}`} />
            <PublicHero title="Kondisi Umum" subtitle={`Letak dan keadaan wilayah ${namaDesa}`} />

            <div className="max-w-4xl mx-auto py-12 px-4 w-full space-y-10">
                {/* Ringkasan wilayah */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Info label="Luas Wilayah" value={profil?.luas_wilayah} />
                    <Info label="Kecamatan" value={profil?.kecamatan} />
                    <Info label="Kabupaten" value={profil?.kabupaten} />
                    <Info label="Provinsi" value={profil?.provinsi} />
                </div>

                {/* Batas wilayah */}
                <section>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-5 pb-3 border-b border-gray-200">Batas Wilayah</h3>
                    {adaBatas ? (
                        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
                            <div className="col-start-2 row-start-1"><Arah label="Utara" value={profil?.batas_utara} /></div>
                            <div className="col-start-1 row-start-2"><Arah label="Barat" value={profil?.batas_barat} /></div>
                            <div className="col-start-2 row-start-2 bg-green-700 text-white rounded-xl flex items-center justify-center p-3 text-center font-bold text-sm sm:text-base">
                                {namaDesa}
                            </div>
                            <div className="col-start-3 row-start-2"><Arah label="Timur" value={profil?.batas_timur} /></div>
                            <div className="col-start-2 row-start-3"><Arah label="Selatan" value={profil?.batas_selatan} /></div>
                        </div>
                    ) : (
                        <EmptyState>Data batas wilayah sedang dilengkapi.</EmptyState>
                    )}
                </section>

                {/* Uraian kondisi umum */}
                <section>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-5 pb-3 border-b border-gray-200">Gambaran Umum</h3>
                    {profil?.kondisi_umum ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-gray-700 leading-relaxed whitespace-pre-line">
                            {profil.kondisi_umum}
                        </div>
                    ) : (
                        <EmptyState>Uraian kondisi umum desa sedang dilengkapi.</EmptyState>
                    )}
                </section>

                {adaLokasi && (
                    <div className="text-center">
                        <a
                            href={`https://www.google.com/maps?q=${profil.latitude},${profil.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
                        >
                            📍 Lihat Lokasi di Google Maps
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

KondisiUmum.layout = (page) => <PublicLayout>{page}</PublicLayout>;
