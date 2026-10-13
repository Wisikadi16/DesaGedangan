import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, profil }) {
    // Inisialisasi useForm Inertia dengan data dari database (jika ada)
    const { data, setData, post, processing, errors, progress } = useForm({
        nama_desa: profil?.nama_desa || 'Desa Gedangan',
        kecamatan: profil?.kecamatan || 'Tuntang',
        kabupaten: profil?.kabupaten || 'Semarang',
        provinsi: profil?.provinsi || 'Jawa Tengah',
        deskripsi: profil?.deskripsi || '',
        alamat: profil?.alamat || '',
        telepon: profil?.telepon || '',
        email: profil?.email || '',
        website: profil?.website || '',
        sejarah: profil?.sejarah || '',
        visi: profil?.visi || '',
        misi: profil?.misi || '',
        luas_wilayah: profil?.luas_wilayah || '',
        batas_utara: profil?.batas_utara || '',
        batas_selatan: profil?.batas_selatan || '',
        batas_timur: profil?.batas_timur || '',
        batas_barat: profil?.batas_barat || '',
        kondisi_umum: profil?.kondisi_umum || '',
        jumlah_laki_laki: profil?.jumlah_laki_laki || 0,
        jumlah_perempuan: profil?.jumlah_perempuan || 0,
        jumlah_kk: profil?.jumlah_kk || 0,
        potensi: profil?.potensi || '',
        masalah: profil?.masalah || '',
        logo: null,
        cover: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // Menggunakan POST karena kita mengirim file gambar (logo/cover)
        post(route('admin.profil.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Profil Desa</h2>}
        >
            <Head title="Kelola Profil Desa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 lg:p-8">
                        
                        <form onSubmit={submit} className="space-y-8">
                            
                            {/* --- BAGIAN 1: IDENTITAS & KONTAK --- */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Identitas & Kontak Desa</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nama Desa</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" 
                                            value={data.nama_desa} onChange={e => setData('nama_desa', e.target.value)} />
                                        {errors.nama_desa && <div className="text-red-500 text-sm mt-1">{errors.nama_desa}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Kecamatan</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" 
                                            value={data.kecamatan} onChange={e => setData('kecamatan', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat (Slogan/Tagline)</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" 
                                            value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Alamat Lengkap Kantor Desa</label>
                                        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows="2"
                                            value={data.alamat} onChange={e => setData('alamat', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* --- BAGIAN 2: SEJARAH, VISI, & MISI --- */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Sejarah, Visi & Misi</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sejarah Desa</label>
                                        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows="5"
                                            value={data.sejarah} onChange={e => setData('sejarah', e.target.value)}></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Visi</label>
                                        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows="3"
                                            value={data.visi} onChange={e => setData('visi', e.target.value)}></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Misi</label>
                                        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows="5"
                                            value={data.misi} onChange={e => setData('misi', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* --- BAGIAN 3: KONDISI WILAYAH & PENDUDUK --- */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Kondisi Wilayah & Penduduk</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Kondisi Umum Wilayah (Geografis)</label>
                                        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows="4"
                                            value={data.kondisi_umum} onChange={e => setData('kondisi_umum', e.target.value)}></textarea>
                                    </div>
                                    
                                    {/* Batas Wilayah */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Batas Utara</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.batas_utara} onChange={e => setData('batas_utara', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Batas Selatan</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.batas_selatan} onChange={e => setData('batas_selatan', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Batas Timur</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.batas_timur} onChange={e => setData('batas_timur', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Batas Barat</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.batas_barat} onChange={e => setData('batas_barat', e.target.value)} />
                                    </div>

                                    {/* Statistik Penduduk */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Jumlah Laki-Laki</label>
                                        <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.jumlah_laki_laki} onChange={e => setData('jumlah_laki_laki', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Jumlah Perempuan</label>
                                        <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.jumlah_perempuan} onChange={e => setData('jumlah_perempuan', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Jumlah Kepala Keluarga (KK)</label>
                                        <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.jumlah_kk} onChange={e => setData('jumlah_kk', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Luas Wilayah (Misal: 500 Ha)</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.luas_wilayah} onChange={e => setData('luas_wilayah', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* --- BAGIAN 4: POTENSI & MASALAH --- */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Potensi & Tantangan</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Potensi Desa</label>
                                        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows="4"
                                            value={data.potensi} onChange={e => setData('potensi', e.target.value)}></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Masalah / Tantangan Desa</label>
                                        <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" rows="4"
                                            value={data.masalah} onChange={e => setData('masalah', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* TOMBOL SIMPAN */}
                            <div className="flex justify-end pt-4">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-3 bg-green-600 border border-transparent rounded-md font-bold text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 transition ease-in-out duration-150 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan Data...' : 'Simpan Profil Desa'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}