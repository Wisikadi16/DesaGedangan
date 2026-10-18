import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        tahun: '',
        kategori: '',
        tanggal: '',
        deskripsi: '',
        gambar: null,
        file_lampiran: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.transparansi.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Transparansi" />
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto mt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Tambah Data Transparansi</h2>
                    <Link href={route('admin.transparansi.index')} className="text-gray-600 hover:underline text-sm">
                        &larr; Kembali
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
                                <option value="Transparansi">Transparansi</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tahun</label>
                            <input type="number" value={data.tahun} onChange={e => setData('tahun', e.target.value)} className="mt-1 block w-full rounded border-gray-300 shadow-sm" placeholder="Contoh: 2026" />
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

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Thumbnail / Gambar (Opsional)</label>
                            <input type="file" accept="image/*" onChange={e => setData('gambar', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                            {errors.gambar && <span className="text-red-500 text-xs">{errors.gambar}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">File Lampiran PDF (Opsional)</label>
                            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={e => setData('file_lampiran', e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            {errors.file_lampiran && <span className="text-red-500 text-xs">{errors.file_lampiran}</span>}
                        </div>
                    </div>

                    <div className="pt-4 border-t mt-6">
                        <button type="submit" disabled={processing} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold transition disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Simpan Data'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}