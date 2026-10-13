import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PublicHero from '@/Components/PublicHero';
import EmptyState from '@/Components/EmptyState';
import { formatAngka } from '@/utils/format';

function Statistik({ label, value, warna }) {
    return (
        <div className={`rounded-xl p-5 text-center text-white shadow-md ${warna}`}>
            <p className="text-3xl font-extrabold">{value}</p>
            <p className="text-sm font-semibold opacity-90 mt-1">{label}</p>
        </div>
    );
}

export default function ProfilPenduduk({ profil, dusun }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    const laki = Number(profil?.jumlah_laki_laki || 0);
    const perempuan = Number(profil?.jumlah_perempuan || 0);
    const kk = Number(profil?.jumlah_kk || 0);
    const total = laki + perempuan;

    const daftarDusun = dusun || [];
    const totalDusun = daftarDusun.reduce((jumlah, d) => jumlah + Number(d.jumlah_penduduk || 0), 0);
    const terbanyak = Math.max(0, ...daftarDusun.map((d) => Number(d.jumlah_penduduk || 0)));
    const persenLaki = total ? (laki / total) * 100 : 0;

    const kosong = total === 0 && kk === 0 && totalDusun === 0;

    return (
        <>
            <Head title={`Profil Penduduk - ${namaDesa}`} />
            <PublicHero title="Profil Penduduk" subtitle={`Data kependudukan ${namaDesa}`} />

            <div className="max-w-4xl mx-auto py-12 px-4 w-full space-y-10">
                {kosong ? (
                    <EmptyState>Data kependudukan sedang dilengkapi oleh pemerintah desa.</EmptyState>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Statistik label="Total Penduduk" value={formatAngka(total || totalDusun)} warna="bg-green-700" />
                            <Statistik label="Laki-laki" value={formatAngka(laki)} warna="bg-blue-600" />
                            <Statistik label="Perempuan" value={formatAngka(perempuan)} warna="bg-pink-600" />
                            <Statistik label="Kepala Keluarga" value={formatAngka(kk)} warna="bg-amber-600" />
                        </div>

                        {total > 0 && (
                            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Komposisi Jenis Kelamin</h3>
                                <div className="flex h-5 rounded-full overflow-hidden bg-gray-200">
                                    <div className="bg-blue-500" style={{ width: `${persenLaki}%` }} />
                                    <div className="bg-pink-500" style={{ width: `${100 - persenLaki}%` }} />
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span>Laki-laki {persenLaki.toFixed(1)}%</span>
                                    <span>Perempuan {(100 - persenLaki).toFixed(1)}%</span>
                                </div>
                            </section>
                        )}

                        {daftarDusun.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-extrabold text-gray-900 mb-5 pb-3 border-b border-gray-200">
                                    Penduduk per Dusun
                                </h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y">
                                    {daftarDusun.map((d) => {
                                        const jumlah = Number(d.jumlah_penduduk || 0);
                                        return (
                                            <div key={d.id} className="p-4 flex items-center gap-4">
                                                <span className="w-32 sm:w-44 font-semibold text-gray-800 text-sm sm:text-base shrink-0">
                                                    {d.nama_dusun}
                                                </span>
                                                <div className="flex-grow h-3 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500"
                                                        style={{ width: terbanyak ? `${(jumlah / terbanyak) * 100}%` : '0%' }}
                                                    />
                                                </div>
                                                <span className="w-16 text-right font-bold text-green-700 text-sm sm:text-base">
                                                    {formatAngka(jumlah)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    <div className="p-4 flex justify-between font-bold bg-gray-50 rounded-b-2xl">
                                        <span>Jumlah seluruh dusun</span>
                                        <span className="text-green-700">{formatAngka(totalDusun)} jiwa</span>
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

ProfilPenduduk.layout = (page) => <PublicLayout>{page}</PublicLayout>;
