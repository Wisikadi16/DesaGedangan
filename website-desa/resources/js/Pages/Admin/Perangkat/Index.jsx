import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ perangkat }) {
    const hapus = (item) => {
        if (confirm(`Yakin ingin menghapus ${item.nama}?`)) {
            router.delete(route('admin.pemerintahan.destroy', item.id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Kelola Perangkat Desa</h2>}>
            <Head title="Kelola Perangkat Desa" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-green-500">
                        <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-700">Perangkat Pemerintahan Desa</h3>
                            <Link
                                href={route('admin.pemerintahan.create')}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-sm text-sm"
                            >
                                + Tambah Perangkat
                            </Link>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Urutan angka terkecil tampil paling atas di halaman publik. Perangkat pertama (misalnya Kepala Desa) ditampilkan paling menonjol.
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 border-b-2 border-gray-200">
                                        <th className="p-3">Urutan</th>
                                        <th className="p-3">Foto</th>
                                        <th className="p-3">Nama</th>
                                        <th className="p-3">Jabatan</th>
                                        <th className="p-3">Telepon</th>
                                        <th className="p-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {perangkat && perangkat.length > 0 ? (
                                        perangkat.map((item) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="p-3 font-bold text-gray-500">{item.urutan}</td>
                                                <td className="p-3">
                                                    {item.foto ? (
                                                        <img src={`/storage/${item.foto}`} alt={item.nama} className="h-14 w-11 object-cover rounded shadow-sm" />
                                                    ) : (
                                                        <div className="h-14 w-11 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">-</div>
                                                    )}
                                                </td>
                                                <td className="p-3 font-semibold">{item.nama}</td>
                                                <td className="p-3">{item.jabatan}</td>
                                                <td className="p-3">{item.telepon || '-'}</td>
                                                <td className="p-3 text-center space-x-2 whitespace-nowrap">
                                                    <Link
                                                        href={route('admin.pemerintahan.edit', item.id)}
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
                                            <td colSpan="6" className="p-6 text-center text-gray-500 italic">
                                                Belum ada data perangkat desa.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}