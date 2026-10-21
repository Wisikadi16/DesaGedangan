import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, lembaga, kategori_aktif }) {
    const listKategori = ['BPD', 'LKMD', 'TPK', 'KPMD', 'PKK', 'RT_RW', 'ORMAS'];

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('admin.lembaga.destroy', id));
        }
    };

    const handleFilter = (kat) => {
        router.get(route('admin.lembaga.index'), { kategori: kat }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Lembaga Desa</h2>}>
            <Head title="Kelola Lembaga" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                
                {/* Tab Filter Kategori */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {listKategori.map(kat => (
                        <button 
                            key={kat}
                            onClick={() => handleFilter(kat)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm ${kategori_aktif === kat ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}
                        >
                            {kat.replace('_', '/')}
                        </button>
                    ))}
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Data {kategori_aktif.replace('_', '/')}</h3>
                        <Link href={route('admin.lembaga.create')} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700">
                            + Tambah Data
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat / Keterangan</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {lembaga.length > 0 ? lembaga.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.jabatan || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.alamat_atau_keterangan || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={route('admin.lembaga.edit', item.id)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</Link>
                                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data di kategori ini.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}