import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatAngka } from '@/utils/format';

export default function Index({ dusun }) {
    const hapus = (item) => {
        if (confirm(`Yakin ingin menghapus ${item.nama_dusun}?`)) {
            router.delete(route('admin.dusun.destroy', item.id));
        }
    };

    const total = (dusun || []).reduce((jumlah, d) => jumlah + Number(d.jumlah_penduduk || 0), 0);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Kelola Data Dusun</h2>}>
            <Head title="Kelola Dusun" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-green-500">
                        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                            <h3 className="text-lg font-bold text-gray-700">Daftar Dusun</h3>
                            <Link
                                href={route('admin.dusun.create')}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-sm text-sm"
                            >
                                + Tambah Dusun
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 border-b-2 border-gray-200">
                                        <th className="p-3">No</th>
                                        <th className="p-3">Nama Dusun</th>
                                        <th className="p-3">Kepala Dusun</th>
                                        <th className="p-3 text-right">Penduduk</th>
                                        <th className="p-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dusun && dusun.length > 0 ? (
                                        dusun.map((item, index) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3 font-semibold">{item.nama_dusun}</td>
                                                <td className="p-3">{item.nama_kepala_dusun || '-'}</td>
                                                <td className="p-3 text-right">{formatAngka(item.jumlah_penduduk)}</td>
                                                <td className="p-3 text-center space-x-2 whitespace-nowrap">
                                                    <Link
                                                        href={route('admin.dusun.edit', item.id)}
                                                        className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-yellow-600 transition shadow-sm inline-block"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => hapus(item)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600 transition shadow-sm inline-block"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-6 text-center text-gray-500 italic">
                                                Belum ada data dusun.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {dusun && dusun.length > 0 && (
                                    <tfoot>
                                        <tr className="bg-gray-50 font-bold">
                                            <td className="p-3" colSpan="3">Jumlah seluruh dusun</td>
                                            <td className="p-3 text-right">{formatAngka(total)}</td>
                                            <td />
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}