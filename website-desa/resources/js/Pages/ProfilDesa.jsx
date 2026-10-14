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
                <div className="bg-green-800 text-white text-center py-24 px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Profil {namaDesa}</h1>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto font-light">Kenali lebih dekat sejarah, pemerintahan, potensi, dan kondisi wilayah desa kami.</p>
                </div>

                <div className="max-w-5xl mx-auto py-16 px-4 space-y-24">
                    {/* 1. SEJARAH & VISI MISI */}
                    <section id="sejarah" className="scroll-mt-24 space-y-12">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-200">Sejarah Desa</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                                {profil?.sejarah || 'Sejarah desa sedang dilengkapi.'}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-extrabold text-green-700 mb-4">🎯 Visi</h3>
                                <div className="bg-green-50 rounded-2xl shadow-sm border border-green-200 p-6 text-gray-800 text-lg italic h-full">"{profil?.visi || '-'}"</div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-extrabold text-green-700 mb-4">🚀 Misi</h3>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-gray-700 whitespace-pre-line h-full">{profil?.misi || '-'}</div>
                            </div>
                        </div>
                    </section>

                    {/* 2. PEMERINTAHAN DESA */}
                    <section id="pemerintahan" className="scroll-mt-24">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 pb-3 border-b border-gray-200 text-center">Pemerintahan Desa</h2>
                        {daftarPerangkat.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {daftarPerangkat.map((p, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-center">
                                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                                            {p.foto_path ? <img src={`/storage/${p.foto_path}`} className="w-full h-full object-cover" /> : <span className="text-6xl">👨‍💼</span>}
                                        </div>
                                        <div className="p-5">
                                            <h4 className="font-extrabold text-lg mb-1">{p.nama}</h4>
                                            <p className="text-green-700 font-bold text-sm bg-green-50 inline-block px-3 py-1 rounded-full">{p.jabatan}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-center italic">Data perangkat belum ada.</p>}
                    </section>

                    {/* 3. KONDISI UMUM */}
                    <section id="kondisi" className="scroll-mt-24 space-y-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            Kondisi Umum & Geografis
                        </h2>

                        {/* Highlight Letak & Luas */}
                        <div className="bg-green-800 text-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <p className="text-green-200 text-xs font-bold uppercase tracking-wider mb-1">Letak Geografis</p>
                                <p className="text-lg md:text-xl font-medium">{profil?.letak_geografis || '110.4625" BT dan -7.332383" LS'}</p>
                            </div>
                            <div className="h-12 w-px bg-green-600 hidden md:block"></div>
                            <div>
                                <p className="text-green-200 text-xs font-bold uppercase tracking-wider mb-1">Ketinggian Rata-rata</p>
                                <p className="text-lg md:text-xl font-medium">{profil?.ketinggian || '500 mdpl'}</p>
                            </div>
                            <div className="h-12 w-px bg-green-600 hidden md:block"></div>
                            <div>
                                <p className="text-green-200 text-xs font-bold uppercase tracking-wider mb-1">Luas Wilayah</p>
                                <p className="text-lg md:text-xl font-medium">{profil?.luas_wilayah || '267,707 Ha'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            
                            {/* Batas Wilayah */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
                                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                    🧭 Batas Wilayah
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-bold text-gray-700">Utara</span> 
                                        <span className="text-right">{profil?.batas_utara || 'Desa Sraten'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-bold text-gray-700">Timur</span> 
                                        <span className="text-right">{profil?.batas_timur || 'Kab. Semarang & Kota Salatiga'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
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
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
                                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                    ⛅ Klimatologi
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-bold text-gray-700">Iklim</span> 
                                        <span className="font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded">{profil?.iklim || 'Tropis'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-bold text-gray-700">Suhu Udara Rata-rata</span> 
                                        <span>{profil?.suhu || '20°C - 30°C'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-100 pb-2">
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
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:col-span-2 hover:shadow-md transition">
                                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                    🏞️ Topografi & Tata Guna Lahan
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                                        <p className="text-xs font-bold text-blue-600 uppercase mb-1">Tanah Datar</p>
                                        <p className="text-xl font-extrabold text-blue-800">{profil?.luas_datar || '196,713 Ha'}</p>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
                                        <p className="text-xs font-bold text-amber-600 uppercase mb-1">Pegunungan</p>
                                        <p className="text-xl font-extrabold text-amber-800">{profil?.luas_pegunungan || '70,994 Ha'}</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                                        <p className="text-xs font-bold text-green-600 uppercase mb-1">Sawah Teririgasi</p>
                                        <p className="text-xl font-extrabold text-green-800">{profil?.sawah_irigasi || '30,500 Ha'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                                        <p className="text-xs font-bold text-gray-600 uppercase mb-1">Pemukiman</p>
                                        <p className="text-xl font-extrabold text-gray-800">{profil?.pemukiman || '60 Ha'}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Deskripsi Tambahan (Jika Ada) */}
                            {profil?.kondisi_umum && (
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:col-span-2">
                                    <h3 className="font-bold text-gray-800 text-lg mb-3">Gambaran Umum Wilayah</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                                        {profil.kondisi_umum}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* 4. PENDUDUK */}
                    <section id="penduduk" className="scroll-mt-24 space-y-12">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-200">Profil Kependudukan</h2>
                            
                            {/* Ringkasan Total Penduduk */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-10">
                                <div className="bg-green-700 text-white rounded-2xl p-6 shadow-md">
                                    <p className="text-3xl font-extrabold">{formatAngka(laki + perempuan)}</p>
                                    <p className="text-sm mt-1 opacity-90">Total Jiwa</p>
                                </div>
                                <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-md">
                                    <p className="text-3xl font-extrabold">{formatAngka(laki)}</p>
                                    <p className="text-sm mt-1 opacity-90">Laki-laki</p>
                                </div>
                                <div className="bg-pink-600 text-white rounded-2xl p-6 shadow-md">
                                    <p className="text-3xl font-extrabold">{formatAngka(perempuan)}</p>
                                    <p className="text-sm mt-1 opacity-90">Perempuan</p>
                                </div>
                                <div className="bg-amber-600 text-white rounded-2xl p-6 shadow-md">
                                    <p className="text-3xl font-extrabold">{formatAngka(kk)}</p>
                                    <p className="text-sm mt-1 opacity-90">Kepala Keluarga</p>
                                </div>
                            </div>

                            {/* Tabel Data Penduduk menggunakan Grid 2 Kolom */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                
                                {/* Tabel Kelompok Umur */}
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                                        <h3 className="font-bold text-gray-800 text-lg">Kelompok Usia</h3>
                                    </div>
                                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                                        <table className="w-full text-sm text-left text-gray-600">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                                                <tr>
                                                    <th className="px-6 py-3">Kelompok Umur</th>
                                                    <th className="px-6 py-3 text-center">Laki-laki</th>
                                                    <th className="px-6 py-3 text-center">Perempuan</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {profil?.kelompok_umur && profil.kelompok_umur.length > 0 ? (
                                                    profil.kelompok_umur.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="px-6 py-3 font-medium text-gray-900">{item.rentang}</td>
                                                            <td className="px-6 py-3 text-center">{item.laki}</td>
                                                            <td className="px-6 py-3 text-center">{item.perempuan}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr><td colSpan="3" className="px-6 py-4 text-center italic text-gray-400">Data belum tersedia</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Kolom Kanan: Agama & Pekerjaan */}
                                <div className="space-y-8">
                                    
                                    {/* Tabel Agama */}
                                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                                            <h3 className="font-bold text-gray-800 text-lg">Agama Penduduk</h3>
                                        </div>
                                        <table className="w-full text-sm text-left text-gray-600">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3">Agama</th>
                                                    <th className="px-6 py-3 text-right">Jumlah</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {profil?.agama && profil.agama.length > 0 ? (
                                                    profil.agama.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="px-6 py-3 font-medium text-gray-900">{item.nama}</td>
                                                            <td className="px-6 py-3 text-right font-bold text-green-600">{formatAngka(item.jumlah)} Jiwa</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr><td colSpan="2" className="px-6 py-4 text-center italic text-gray-400">Data belum tersedia</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Tabel Pekerjaan */}
                                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                                            <h3 className="font-bold text-gray-800 text-lg">Mata Pencaharian</h3>
                                        </div>
                                        <div className="overflow-x-auto max-h-64 overflow-y-auto">
                                            <table className="w-full text-sm text-left text-gray-600">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                                                    <tr>
                                                        <th className="px-6 py-3">Jenis Pekerjaan</th>
                                                        <th className="px-6 py-3 text-right">Jumlah</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {profil?.pekerjaan && profil.pekerjaan.length > 0 ? (
                                                        profil.pekerjaan.map((item, index) => (
                                                            <tr key={index} className="hover:bg-gray-50">
                                                                <td className="px-6 py-3 font-medium text-gray-900">{item.nama}</td>
                                                                <td className="px-6 py-3 text-right font-bold text-green-600">{formatAngka(item.jumlah)}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr><td colSpan="2" className="px-6 py-4 text-center italic text-gray-400">Data belum tersedia</td></tr>
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
                    <section id="masalah" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-sm border-t-4 border-green-600 border-x border-b p-8">
                            <h3 className="text-2xl font-extrabold text-green-700 mb-4">🌱 Potensi</h3><p>{profil?.potensi || '-'}</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border-t-4 border-amber-500 border-x border-b p-8">
                            <h3 className="text-2xl font-extrabold text-amber-700 mb-4">⚠️ Tantangan</h3><p>{profil?.masalah || '-'}</p>
                        </div>
                    </section>

                    {/* 6. DUSUN */}
                    <section id="dusun" className="scroll-mt-24">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-200">Wilayah Dusun</h2>
                        {daftarDusun.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {daftarDusun.map((d, index) => (
                                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border">
                                        <h4 className="text-xl font-bold">{d.nama_dusun}</h4>
                                        <p className="text-green-700 text-sm">Kepala Dusun: {d.nama_kepala_dusun || '-'}</p>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="italic">Data dusun belum ada.</p>}
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}