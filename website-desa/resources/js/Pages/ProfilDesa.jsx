import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { formatAngka } from '@/utils/format';

export default function ProfilDesa({ profil, perangkat, bpd, lkmd, tpk, pkk, rtrw, dusun, auth }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    const daftarPerangkat = perangkat || [];
    const daftarBpd = bpd || [];
    const daftarLkmd = lkmd || [];
    const daftarTpk = tpk || [];
    const daftarPkk = pkk || [];
    const daftarRtRw = rtrw || [];
    const daftarDusun = dusun || [];
    
    const laki = Number(profil?.jumlah_laki_laki || 0);
    const perempuan = Number(profil?.jumlah_perempuan || 0);
    const kk = Number(profil?.jumlah_kk || 0);

    // Parsing data dinamis dari database (kosong dan siap diisi dari panel admin)
    const kelompokUmur = typeof profil?.kelompok_umur === 'string' ? JSON.parse(profil.kelompok_umur) : (profil?.kelompok_umur || []);
    const dataAgama = typeof profil?.agama === 'string' ? JSON.parse(profil.agama) : (profil?.agama || []);
    const dataPekerjaan = typeof profil?.pekerjaan === 'string' ? JSON.parse(profil.pekerjaan) : (profil?.pekerjaan || []);

    const [activeTab, setActiveTab] = useState('perangkat');

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
                    
                    {/* 1. SEJARAH & VISI MISI LENGKAP */}
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

                        {/* VISI & MISI DETAIL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-3xl border border-green-200/60 p-8 shadow-sm space-y-6">
                                <div>
                                    <span className="text-2xl mb-3 block">🎯</span>
                                    <h3 className="text-xl font-extrabold text-green-800 mb-3">Visi</h3>
                                    <div className="text-gray-900 text-base md:text-lg font-bold tracking-wide whitespace-pre-line leading-relaxed">
                                        {profil?.visi || '-'}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
                                <div>
                                    <span className="text-2xl mb-3 block">🚀</span>
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-4">Misi</h3>
                                    <div className="text-gray-700 whitespace-pre-line text-sm md:text-base leading-relaxed">
                                        {profil?.misi || '-'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. PEMERINTAHAN DESA & TAB LEMBAGA */}
                    <section id="pemerintahan" className="scroll-mt-28">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <span className="text-green-700 font-bold text-xs uppercase tracking-widest bg-green-50 px-3 py-1 rounded-md">Aparatur Desa</span>
                            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Pemerintahan Desa & Lembaga</h2>
                            <p className="text-gray-500 text-sm mt-1">Struktur organisasi, jajaran perangkat, dan lembaga kemasyarakatan desa.</p>
                        </div>

                        {/* Navigasi Tab Interaktif Lembaga */}
                        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-gray-200 pb-6">
                            <button onClick={() => setActiveTab('perangkat')} className={`px-4 py-2 rounded-xl font-bold text-xs transition ${activeTab === 'perangkat' ? 'bg-green-700 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}>PERANGKAT DESA</button>
                            <button onClick={() => setActiveTab('bpd')} className={`px-4 py-2 rounded-xl font-medium text-xs transition ${activeTab === 'bpd' ? 'bg-green-700 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}>BPD</button>
                            <button onClick={() => setActiveTab('lkmd')} className={`px-4 py-2 rounded-xl font-medium text-xs transition ${activeTab === 'lkmd' ? 'bg-green-700 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}>LKMD</button>
                            <button onClick={() => setActiveTab('tpk')} className={`px-4 py-2 rounded-xl font-medium text-xs transition ${activeTab === 'tpk' ? 'bg-green-700 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}>TPK / KPMD</button>
                            <button onClick={() => setActiveTab('pkk')} className={`px-4 py-2 rounded-xl font-medium text-xs transition ${activeTab === 'pkk' ? 'bg-green-700 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}>PKK</button>
                            <button onClick={() => setActiveTab('rt_rw')} className={`px-4 py-2 rounded-xl font-medium text-xs transition ${activeTab === 'rt_rw' ? 'bg-green-700 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}>RT / RW</button>
                            <button onClick={() => setActiveTab('ormas')} className={`px-4 py-2 rounded-xl font-medium text-xs transition ${activeTab === 'ormas' ? 'bg-green-700 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}>ORMAS / PEMUDA</button>
                        </div>

                        {/* Konten Tab: Perangkat Desa */}
                        {activeTab === 'perangkat' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {daftarPerangkat.map((p, index) => (
                                    <div key={index} className="bg-white rounded-3xl shadow-sm border p-6 text-center group">
                                        <div className="h-48 bg-green-50 flex items-center justify-center rounded-2xl mb-4 overflow-hidden">
                                            {p.foto ? <img src={`/storage/${p.foto}`} alt={p.nama} className="w-full h-full object-cover" /> : <span className="text-5xl">👨‍💼</span>}
                                        </div>
                                        <h4 className="font-extrabold text-lg text-gray-900">{p.nama}</h4>
                                        <span className="text-green-700 font-bold text-xs bg-green-50 px-3 py-1 rounded-full inline-block mt-1">{p.jabatan}</span>
                                        {p.alamat && <p className="text-xs text-gray-500 mt-2">Alamat: {p.alamat}</p>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Konten Tab: BPD */}
                        {activeTab === 'bpd' && (
                            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Badan Permusyawaratan Desa (BPD)</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {daftarBpd.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 text-sm font-medium">{item.jabatan}</td>
                                                <td className="px-6 py-4 text-sm">{item.nama}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.alamat || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Konten Tab: LKMD */}
                        {activeTab === 'lkmd' && (
                            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Lembaga Pemberdayaan Masyarakat Desa (LKMD)</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {daftarLkmd.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 text-sm font-medium">{item.nama}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.alamat || '-'}</td>
                                                <td className="px-6 py-4 text-sm">{item.jabatan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Konten Tab: TPK */}
                        {activeTab === 'tpk' && (
                            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Tim Pengelola Kegiatan (TPK) / KPMD</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {daftarTpk.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 text-sm font-medium">{item.jabatan}</td>
                                                <td className="px-6 py-4 text-sm">{item.nama}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.alamat || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Konten Tab: PKK */}
                        {activeTab === 'pkk' && (
                            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Pemberdayaan Kesejahteraan Keluarga (PKK)</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Pengurus</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {daftarPkk.length > 0 ? daftarPkk.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 text-sm font-medium">{item.jabatan}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.nama}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.alamat || '-'}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-400 italic">Data PKK belum tersedia.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Konten Tab: RT/RW */}
                        {activeTab === 'rt_rw' && (
                            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Rukun Tetangga & Rukun Warga (RT / RW)</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wilayah / RW</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Ketua</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {daftarRtRw.length > 0 ? daftarRtRw.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 text-sm font-semibold text-green-800">{item.alamat}</td>
                                                <td className="px-6 py-4 text-sm">{item.jabatan}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.nama}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-400 italic">Data RT/RW belum tersedia.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Konten Tab: Ormas */}
                        {activeTab === 'ormas' && (
                            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-3">Karang Taruna & Ormas Pemuda (FKPG)</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Ormas Pemuda di Desa Gedangan diwadahi dengan kelompok pemuda karang taruna desa <strong>FKPG (Forum Komunikasi Pemuda Desa Gedangan)</strong> yang mewakili kelompok pemuda di tingkat desa.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* 3. KONDISI UMUM & GEOGRAFIS & BATAS WILAYAH */}
                    <section id="kondisi" className="scroll-mt-28 space-y-8">
                        <div className="flex items-center gap-3">
                            <span className="p-2.5 bg-green-100 text-green-700 rounded-xl text-xl">🗺️</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Kondisi Umum & Geografis</h2>
                        </div>
                        <div className="bg-gradient-to-r from-green-900 to-teal-800 text-white rounded-3xl p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            <div>
                                <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">Letak Geografis</p>
                                <p className="text-lg font-semibold">{profil?.letak_geografis || '-'}</p>
                            </div>
                            <div className="md:border-l md:border-green-700/60 md:pl-6">
                                <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">Ketinggian Rata-rata</p>
                                <p className="text-lg font-semibold">{profil?.ketinggian || '-'}</p>
                            </div>
                            <div className="md:border-l md:border-green-700/60 md:pl-6">
                                <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">Luas Wilayah</p>
                                <p className="text-lg font-semibold">{profil?.luas_wilayah || '-'}</p>
                            </div>
                        </div>

                        {/* Batas Wilayah Desa */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
                            <h3 className="text-xl font-extrabold text-gray-900">Batas Wilayah Desa</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100">
                                    <p className="text-xs font-bold text-green-800 uppercase mb-1">Sebelah Utara</p>
                                    <p className="text-gray-700 font-medium">{profil?.batas_utara || '-'}</p>
                                </div>
                                <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100">
                                    <p className="text-xs font-bold text-green-800 uppercase mb-1">Sebelah Selatan</p>
                                    <p className="text-gray-700 font-medium">{profil?.batas_selatan || '-'}</p>
                                </div>
                                <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100">
                                    <p className="text-xs font-bold text-green-800 uppercase mb-1">Sebelah Barat</p>
                                    <p className="text-gray-700 font-medium">{profil?.batas_barat || '-'}</p>
                                </div>
                                <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100">
                                    <p className="text-xs font-bold text-green-800 uppercase mb-1">Sebelah Timur</p>
                                    <p className="text-gray-700 font-medium">{profil?.batas_timur || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. PENDUDUK & BOX KOSONG DINAMIS (SIAP DIISI DARI PANEL ADMIN) */}
                    <section id="penduduk" className="scroll-mt-28 space-y-10">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="p-2.5 bg-green-100 text-green-700 rounded-xl text-xl">📊</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Profil Kependudukan</h2>
                        </div>
                        
                        {/* Kartu Ringkasan Jiwa */}
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

                        {/* Box Tabel Dinamis (Struktur ada, data murni kosong menunggu input admin) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            
                            {/* Box Kelompok Usia */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4">
                                    <h3 className="font-bold text-gray-900 text-lg">Kelompok Usia</h3>
                                </div>
                                <div className="px-2 pb-2">
                                    <table className="w-full text-sm text-left text-gray-600">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-2.5">Kelompok Umur</th>
                                                <th className="px-4 py-2.5 text-center">Laki-laki</th>
                                                <th className="px-6 py-2.5 text-center">Perempuan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {kelompokUmur.length > 0 ? (
                                                kelompokUmur.map((item, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="px-6 py-2.5 font-medium text-gray-900">{item.rentang}</td>
                                                        <td className="px-4 py-2.5 text-center">{item.laki}</td>
                                                        <td className="px-6 py-2.5 text-center">{item.perempuan}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="3" className="px-6 py-6 text-center italic text-gray-400">Data belum tersedia (silakan isi dari panel admin).</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8 w-full">
                                {/* Box Agama Penduduk */}
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
                                            {dataAgama.length > 0 ? (
                                                dataAgama.map((item, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="px-6 py-2.5 font-medium text-gray-900">{item.nama}</td>
                                                        <td className="px-6 py-2.5 text-right font-bold text-green-700">{formatAngka(item.jumlah)} Jiwa</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="2" className="px-6 py-6 text-center italic text-gray-400">Data belum tersedia (silakan isi dari panel admin).</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Box Mata Pencaharian / Pekerjaan */}
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                                    <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4">
                                        <h3 className="font-bold text-gray-900 text-lg">Mata Pencaharian</h3>
                                    </div>
                                    <div className="overflow-x-auto px-2 pb-2">
                                        <table className="w-full text-sm text-left text-gray-600">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-2.5">Jenis Pekerjaan</th>
                                                    <th className="px-6 py-2.5 text-right">Jumlah</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {dataPekerjaan.length > 0 ? (
                                                    dataPekerjaan.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="px-6 py-2.5 font-medium text-gray-900">{item.nama}</td>
                                                            <td className="px-6 py-2.5 text-right font-bold text-green-700">{formatAngka(item.jumlah)}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr><td colSpan="2" className="px-6 py-6 text-center italic text-gray-400">Data belum tersedia (silakan isi dari panel admin).</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. DUSUN */}
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