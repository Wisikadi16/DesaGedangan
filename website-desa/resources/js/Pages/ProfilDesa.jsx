import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { formatAngka } from '@/utils/format';

export default function ProfilDesa({ profil, perangkat, dusun, auth }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    const daftarPerangkat = perangkat || [];
    const daftarDusun = dusun || [];
    const laki = Number(profil?.jumlah_laki_laki || 0);
    const perempuan = Number(profil?.jumlah_perempuan || 0);
    const kk = Number(profil?.jumlah_kk || 0);

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Profil Desa - ${namaDesa}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans scroll-smooth">
                {/* Hero Khusus Profil */}
                <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white text-center py-24 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative max-w-3xl mx-auto space-y-4">
                        <span className="bg-green-700/60 text-green-200 border border-green-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Transparansi & Informasi Wilayah
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Profil {namaDesa}</h1>
                        <p className="text-green-100 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                            Kenali lebih dekat sejarah, pemerintahan, potensi, dan kondisi wilayah desa kami.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto py-16 px-4 space-y-20">
                    
                    {/* 1. SEJARAH & VISI MISI */}
                    <section id="sejarah" className="scroll-mt-28 space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-2.5 bg-green-100 text-green-700 rounded-xl text-xl">📜</span>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Sejarah Desa</h2>
                            </div>
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
                                {profil?.sejarah || 'Sejarah desa sedang dilengkapi.'}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-3xl border border-green-200/60 p-8 flex flex-col justify-between shadow-sm">
                                <div>
                                    <span className="text-2xl mb-3 block">🎯</span>
                                    <h3 className="text-xl font-extrabold text-green-800 mb-3">Visi</h3>
                                    <p className="text-gray-800 text-lg italic font-medium leading-relaxed">"{profil?.visi || '-'}"</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col justify-between shadow-sm">
                                <div>
                                    <span className="text-2xl mb-3 block">🚀</span>
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-3">Misi</h3>
                                    <div className="text-gray-600 whitespace-pre-line text-sm md:text-base leading-relaxed">{profil?.misi || '-'}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. PEMERINTAHAN DESA */}
                    <section id="pemerintahan" className="scroll-mt-28">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-green-700 font-bold text-xs uppercase tracking-widest bg-green-50 px-3 py-1 rounded-md">Aparatur Desa</span>
                            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Pemerintahan Desa</h2>
                            <p className="text-gray-500 text-sm mt-1">Struktur organisasi dan jajaran perangkat desa.</p>
                        </div>

                        {daftarPerangkat.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {daftarPerangkat.map((p, index) => (
                                    <div key={index} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-center hover:shadow-md transition duration-300 group">
                                        <div className="h-56 bg-green-50 flex items-center justify-center overflow-hidden relative">
                                            {p.foto_path ? (
                                                <img src={`/storage/${p.foto_path}`} alt={p.nama} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                            ) : (
                                                <span className="text-6xl">👨‍💼</span>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h4 className="font-extrabold text-lg text-gray-900 mb-1">{p.nama}</h4>
                                            <span className="text-green-700 font-bold text-xs bg-green-50 inline-block px-3 py-1 rounded-full">
                                                {p.jabatan}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400 italic">Data perangkat belum ada.</p>
                            </div>
                        )}
                    </section>

                    {/* 3. KONDISI UMUM & GEOGRAFIS */}
                    <section id="kondisi" className="scroll-mt-28 space-y-8">
                        <div className="flex items-center gap-3">
                            <span className="p-2.5 bg-green-100 text-green-700 rounded-xl text-xl">🗺️</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Kondisi Umum & Geografis</h2>
                        </div>

                        {/* Highlight Letak & Luas */}
                        <div className="bg-gradient-to-r from-green-900 to-teal-800 text-white rounded-3xl p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            <div>
                                <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">Letak Geografis</p>
                                <p className="text-lg font-semibold">{profil?.letak_geografis || '110.4625" BT dan -7.332383" LS'}</p>
                            </div>
                            <div className="md:border-l md:border-green-700/60 md:pl-6">
                                <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">Ketinggian Rata-rata</p>
                                <p className="text-lg font-semibold">{profil?.ketinggian || '500 mdpl'}</p>
                            </div>
                            <div className="md:border-l md:border-green-700/60 md:pl-6">
                                <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">Luas Wilayah</p>
                                <p className="text-lg font-semibold">{profil?.luas_wilayah || '267,707 Ha'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            
                            {/* Batas Wilayah */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition">
                                <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                                    🧭 Batas Wilayah
                                </h3>
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex justify-between border-b border-gray-100 pb-3">
                                        <span className="font-bold text-gray-700">Utara</span> 
                                        <span className="text-right">{profil?.batas_utara || 'Desa Sraten'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-3">
                                        <span className="font-bold text-gray-700">Timur</span> 
                                        <span className="text-right">{profil?.batas_timur || 'Kab. Semarang & Kota Salatiga'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-3">
                                        <span className="font-bold text-gray-700">Selatan</span> 
                                        <span className="text-right">{profil?.batas_selatan || 'Desa Polobogo, Kec. Getasan'}</span>
                                    </li>
                                    <li className="flex justify-between pb-1">
                                        <span className="font-bold text-gray-700">Barat</span> 
                                        <span className="text-right">{profil?.batas_barat || 'Desa Kalibeji & Desa Rowosari'}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Klimatologi */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition">
                                <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                                    ⛅ Klimatologi
                                </h3>
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex justify-between border-b border-gray-100 pb-3">
                                        <span className="font-bold text-gray-700">Iklim</span> 
                                        <span className="font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">{profil?.iklim || 'Tropis'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-3">
                                        <span className="font-bold text-gray-700">Suhu Udara Rata-rata</span> 
                                        <span>{profil?.suhu || '20°C - 30°C'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-3">
                                        <span className="font-bold text-gray-700">Curah Hujan</span> 
                                        <span>{profil?.curah_hujan || '3000 mm'}</span>
                                    </li>
                                    <li className="flex justify-between pb-1">
                                        <span className="font-bold text-gray-700">Kelembaban Udara</span> 
                                        <span>{profil?.kelembaban || '-'}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Topografi & Tata Guna Lahan */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:col-span-2 hover:shadow-md transition">
                                <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                                    🏞️ Topografi & Tata Guna Lahan
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 text-center">
                                        <p className="text-xs font-bold text-blue-600 uppercase mb-1">Tanah Datar</p>
                                        <p className="text-xl font-extrabold text-blue-800">{profil?.luas_datar || '196,713 Ha'}</p>
                                    </div>
                                    <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100 text-center">
                                        <p className="text-xs font-bold text-amber-600 uppercase mb-1">Pegunungan</p>
                                        <p className="text-xl font-extrabold text-amber-800">{profil?.luas_pegunungan || '70,994 Ha'}</p>
                                    </div>
                                    <div className="bg-green-50/60 p-5 rounded-2xl border border-green-100 text-center">
                                        <p className="text-xs font-bold text-green-600 uppercase mb-1">Sawah Teririgasi</p>
                                        <p className="text-xl font-extrabold text-green-800">{profil?.sawah_irigasi || '30,500 Ha'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-center">
                                        <p className="text-xs font-bold text-gray-600 uppercase mb-1">Pemukiman</p>
                                        <p className="text-xl font-extrabold text-gray-800">{profil?.pemukiman || '60 Ha'}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Gambaran Umum Wilayah */}
                            {profil?.kondisi_umum && (
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:col-span-2">
                                    <h3 className="font-bold text-gray-900 text-lg mb-3">Gambaran Umum Wilayah</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                                        {profil.kondisi_umum}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* 4. PENDUDUK */}
                    <section id="penduduk" className="scroll-mt-28 space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="p-2.5 bg-green-100 text-green-700 rounded-xl text-xl">📊</span>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Profil Kependudukan</h2>
                            </div>
                            
                            {/* Ringkasan Total Penduduk */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
                                <div className="bg-green-700 text-white rounded-3xl p-6 shadow-md">
                                    <p className="text-3xl font-extrabold">{formatAngka(laki + perempuan)}</p>
                                    <p className="text-xs mt-1 uppercase tracking-wider font-bold opacity-90">Total Jiwa</p>
                                </div>
                                <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-md">
                                    <p className="text-3xl font-extrabold">{formatAngka(laki)}</p>
                                    <p className="text-xs mt-1 uppercase tracking-wider font-bold opacity-90">Laki-laki</p>
                                </div>
                                <div className="bg-pink-600 text-white rounded-3xl p-6 shadow-md">
                                    <p className="text-3xl font-extrabold">{formatAngka(perempuan)}</p>
                                    <p className="text-xs mt-1 uppercase tracking-wider font-bold opacity-90">Perempuan</p>
                                </div>
                                <div className="bg-amber-600 text-white rounded-3xl p-6 shadow-md">
                                    <p className="text-3xl font-extrabold">{formatAngka(kk)}</p>
                                    <p className="text-xs mt-1 uppercase tracking-wider font-bold opacity-90">Kepala Keluarga</p>
                                </div>
                            </div>

                            {/* Tabel Data Penduduk Aman Tanpa Nabrak */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                
                                {/* KOTAK KIRI: Tabel Kelompok Usia */}
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                                    <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4">
                                        <h3 className="font-bold text-gray-900 text-lg">Kelompok Usia</h3>
                                    </div>
                                    <div className="px-2 pb-2">
                                        <table className="w-full text-sm text-left text-gray-600">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                                                <tr>
                                                    <th className="px-6 py-2.5 rounded-l-xl">Kelompok Umur</th>
                                                    <th className="px-4 py-2.5 text-center">Laki-laki</th>
                                                    <th className="px-6 py-2.5 text-center rounded-r-xl">Perempuan</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {profil?.kelompok_umur && profil.kelompok_umur.length > 0 ? (
                                                    profil.kelompok_umur.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-50/50">
                                                            <td className="px-6 py-2.5 font-medium text-gray-900">{item.rentang}</td>
                                                            <td className="px-4 py-2.5 text-center">{item.laki}</td>
                                                            <td className="px-6 py-2.5 text-center">{item.perempuan}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr><td colSpan="3" className="px-6 py-6 text-center italic text-gray-400">Data belum tersedia</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* KOTAK KANAN: Tabel Agama & Mata Pencaharian */}
                                <div className="flex flex-col gap-8 w-full">
                                    
                                    {/* ATAS KANAN: Tabel Agama */}
                                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4">
                                            <h3 className="font-bold text-gray-900 text-lg">Agama Penduduk</h3>
                                        </div>
                                        <table className="w-full text-sm text-left text-gray-600">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-2.5">Agama</th>
                                                    <th className="px-6 py-2.5 text-right">Jumlah</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {profil?.agama && profil.agama.length > 0 ? (
                                                    profil.agama.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-50/50">
                                                            <td className="px-6 py-2.5 font-medium text-gray-900">{item.nama}</td>
                                                            <td className="px-6 py-2.5 text-right font-bold text-green-700">{formatAngka(item.jumlah)} Jiwa</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr><td colSpan="2" className="px-6 py-6 text-center italic text-gray-400">Data belum tersedia</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* BAWAH KANAN: Tabel Pekerjaan */}
                                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                                        <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4 shrink-0">
                                            <h3 className="font-bold text-gray-900 text-lg">Mata Pencaharian</h3>
                                        </div>
                                        <div className="overflow-x-auto px-2 pb-2">
                                            <table className="w-full text-sm text-left text-gray-600">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                                                    <tr>
                                                        <th className="px-6 py-2.5 rounded-l-xl">Jenis Pekerjaan</th>
                                                        <th className="px-6 py-2.5 text-right rounded-r-xl">Jumlah</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {profil?.pekerjaan && profil.pekerjaan.length > 0 ? (
                                                        profil.pekerjaan.map((item, index) => (
                                                            <tr key={index} className="hover:bg-gray-50/50">
                                                                <td className="px-6 py-2.5 font-medium text-gray-900">{item.nama}</td>
                                                                <td className="px-6 py-2.5 text-right font-bold text-green-700">{formatAngka(item.jumlah)}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr><td colSpan="2" className="px-6 py-6 text-center italic text-gray-400">Data belum tersedia</td></tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. POTENSI & MASALAH */}
                    <section id="masalah" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-3xl shadow-sm border-t-4 border-green-600 border-x border-b p-8">
                            <h3 className="text-2xl font-extrabold text-green-700 mb-4">🌱 Potensi</h3>
                            <p className="text-gray-700 leading-relaxed">{profil?.potensi || '-'}</p>
                        </div>
                        <div className="bg-white rounded-3xl shadow-sm border-t-4 border-amber-500 border-x border-b p-8">
                            <h3 className="text-2xl font-extrabold text-amber-700 mb-4">⚠️ Tantangan</h3>
                            <p className="text-gray-700 leading-relaxed">{profil?.masalah || '-'}</p>
                        </div>
                    </section>

                    {/* 6. DUSUN */}
                    <section id="dusun" className="scroll-mt-28">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-2.5 bg-green-100 text-green-700 rounded-xl text-xl">🏘️</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Wilayah Dusun</h2>
                        </div>
                        {daftarDusun.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {daftarDusun.map((d, index) => (
                                    <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">{d.nama_dusun}</h4>
                                            <p className="text-green-700 text-xs font-semibold">Kepala Dusun: {d.nama_kepala_dusun || '-'}</p>
                                        </div>
                                        <span className="p-3 bg-green-50 text-green-700 rounded-2xl text-lg">📍</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">Data dusun belum ada.</p>
                        )}
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}