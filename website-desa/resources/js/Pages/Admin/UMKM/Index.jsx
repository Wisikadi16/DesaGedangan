import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ umkm }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data UMKM ini?')) {
            router.delete(route('admin.umkm.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Kelola Data UMKM</h2>}>
            <Head title="Kelola UMKM" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-green-500">
                        
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-700">Daftar UMKM Warga</h3>
                            <Link href={route('admin.umkm.create')} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-sm text-sm">
                                + Tambah UMKM
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 border-b-2 border-gray-200">
                                        <th className="p-3">No</th>
                                        <th className="p-3">Nama Usaha</th>
                                        <th className="p-3">Pemilik</th>
                                        <th className="p-3">No. WhatsApp</th>
                                        <th className="p-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {umkm && umkm.length > 0 ? (
                                        umkm.map((item, index) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3 font-semibold">{item.nama_umkm}</td>
                                                <td className="p-3">{item.pemilik}</td>
                                                <td className="p-3">{item.whatsapp || '-'}</td>
                                                <td className="p-3 text-center space-x-2">
                                                    <Link href={route('admin.umkm.edit', item.id)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-yellow-600 transition shadow-sm inline-block">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600 transition shadow-sm inline-block">
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-6 text-center text-gray-500 italic">Belum ada data UMKM yang terdaftar.</td>
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