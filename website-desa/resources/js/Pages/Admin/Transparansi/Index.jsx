import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ transparansis }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data transparansi ini?')) {
            destroy(route('admin.transparansi.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Transparansi" />
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 mt-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Kelola Transparansi Desa</h2>
                    <Link 
                        href={route('admin.transparansi.create')} 
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold transition"
                    >
                        + Tambah Data
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 border-r">No</th>
                                <th className="px-4 py-3 border-r">Judul</th>
                                <th className="px-4 py-3 border-r">Kategori</th>
                                <th className="px-4 py-3 border-r">Tanggal / Tahun</th>
                                <th className="px-4 py-3 border-r text-center">Lampiran</th>
                                <th className="px-4 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transparansis.length > 0 ? transparansis.map((item, index) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 border-r text-center">{index + 1}</td>
                                    <td className="px-4 py-3 border-r font-medium text-gray-900">{item.judul}</td>
                                    <td className="px-4 py-3 border-r">{item.kategori}</td>
                                    <td className="px-4 py-3 border-r">{item.tanggal} / {item.tahun}</td>
                                    <td className="px-4 py-3 border-r text-center">
                                        {item.file_lampiran ? (
                                            <a href={`/storage/${item.file_lampiran}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Lihat PDF</a>
                                        ) : '-'}
                                    </td>
                                    <td className="px-4 py-3 flex justify-center gap-2">
                                        <Link href={route('admin.transparansi.edit', item.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-6 text-center text-gray-500">Belum ada data transparansi.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}