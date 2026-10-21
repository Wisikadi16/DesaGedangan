import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, perangkat, kategori_aktif }) {
    const daftarKategori = ['Perangkat Desa', 'BPD', 'LKMD', 'TPK/KPMD', 'PKK', 'RT/RW', 'Ormas/Pemuda'];

    const handleFilter = (kat) => {
        router.get(route('admin.pemerintahan.index'), { kategori: kat }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('admin.pemerintahan.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Pemerintahan & Lembaga Desa</h2>}>
            <Head title="Kelola Pemerintahan" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                {/* Tab Filter Kategori di Admin */}
                <div className="flex flex-wrap gap-2 bg-white p-4 rounded-xl shadow-sm border">
                    {daftarKategori.map((kat) => (
                        <button
                            key={kat}
                            onClick={() => handleFilter(kat)}
                            className={`px-4 py-2 rounded-lg font-bold text-xs transition ${
                                kategori_aktif === kat 
                                    ? 'bg-green-600 text-white shadow' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {kat.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl p-6 border">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Kelola Data: {kategori_aktif}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Tambah, edit, atau hapus data untuk kategori yang sedang dipilih.</p>
                        </div>
                        <Link href={route('admin.pemerintahan.create')} className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-700 shadow">
                            + Tambah Data
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat / Dusun</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {perangkat.length > 0 ? (
                                    perangkat.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-semibold">{item.jabatan}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.alamat || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.pemerintahan.edit', item.id)} className="text-blue-600 hover:text-blue-900 mr-4 font-bold">Edit</Link>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 font-bold">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-400 italic">Belum ada data untuk kategori ini.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}