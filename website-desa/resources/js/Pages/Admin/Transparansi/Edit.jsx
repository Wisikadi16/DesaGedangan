import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ transparansi }) {
    const { data, setData, post, processing, errors } = useForm({
        judul: transparansi.judul || '',
        tahun: transparansi.tahun || '',
        kategori: transparansi.kategori || 'Umum',
        tanggal: transparansi.tanggal || '',
        deskripsi: transparansi.deskripsi || '',
        gambar: null,
        file_lampiran: null,
        _method: 'put', 
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.transparansi.update', transparansi.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Transparansi" />
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto mt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Edit Data Transparansi</h2>
                    <Link href={route('admin.transparansi.index')} className="text-gray-600 hover:underline text-sm">
                        &larr; Batal / Kembali
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Judul Laporan</label>
                        <input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} className="mt-1 block w-full rounded border-gray-300 shadow-sm" required />
                        {errors.judul && <span className="text-red-500 text-xs">{errors.judul}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kategori</label>
                            <select value={data.kategori} onChange={e => setData('kategori', e.target.value)} className="mt-1 block w-full rounded border-gray-300 shadow-sm">
                                <option value="APBDes">APBDes</option>
                                <option value="Realisasi Anggaran">Realisasi Anggaran</option>
                                <option value="Pakta Integritas">Pakta Integritas</option>
                                <option value="Umum">Umum</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tahun</label>
                            <input type="number" value={data.tahun} onChange={e => setData('tahun', e.target.value)} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal Publikasi</label>
                        <input type="date" value={data.tanggal} onChange={e => setData('tanggal', e.target.value)} className="mt-1 block w-full rounded border-gray-300 shadow-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi / Keterangan Singkat</label>
                        <textarea value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} rows="4" className="mt-1 block w-full rounded border-gray-300 shadow-sm"></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ganti Gambar (Opsional)</label>
                            <input type="file" accept="image/*" onChange={e => setData('gambar', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500" />
                            {transparansi.gambar && <p className="text-xs text-green-600 mt-1">✓ Gambar saat ini terpasang</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ganti File Lampiran (Opsional)</label>
                            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={e => setData('file_lampiran', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500" />
                            {transparansi.file_lampiran && <p className="text-xs text-blue-600 mt-1">✓ File saat ini terpasang</p>}
                        </div>
                    </div>

                    <div className="pt-4 border-t mt-6">
                        <button type="submit" disabled={processing} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-bold transition disabled:opacity-50">
                            {processing ? 'Menyimpan Perubahan...' : 'Update Data'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}