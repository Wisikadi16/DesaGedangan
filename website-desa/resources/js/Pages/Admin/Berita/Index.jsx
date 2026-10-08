import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ berita }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            destroy(route('admin.berita.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Manajemen Berita</h2>}>
            <Head title="Kelola Berita" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Daftar Berita Desa</h3>
                            <Link href={route('admin.berita.create')} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 font-bold text-sm">
                                + Tambah Berita Baru
                            </Link>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                               <thead>
                                    <tr className="bg-gray-100 text-sm text-gray-700">
                                        <th className="p-3 border text-center w-12">No</th>
                                        <th className="p-3 border w-24 text-center">Foto</th>
                                        <th className="p-3 border">Judul Berita</th>
                                        <th className="p-3 border w-36">Kategori</th>
                                        <th className="p-3 border w-32">Tanggal</th>
                                        <th className="p-3 border text-center w-36">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {berita && berita.length > 0 ? (
                                        berita.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="p-3 border text-center">{index + 1}</td>
                                                <td className="p-3 border text-center">
                                                    {item.gambar ? (
                                                        <img src={`/storage/${item.gambar}`} alt={item.judul} className="w-16 h-12 object-cover rounded mx-auto shadow-sm" />
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">Tidak ada</span>
                                                    )}
                                                </td>
                                                <td className="p-3 border font-semibold text-gray-900">{item.judul}</td>
                                                <td className="p-3 border">
                                                    <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">
                                                        {item.category?.nama || 'Umum'}
                                                    </span>
                                                </td>
                                                <td className="p-3 border text-gray-600">{item.tanggal || '-'}</td>
                                                <td className="p-3 border text-center space-x-1">
                                                    <Link href={route('admin.berita.edit', item.id)} className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-yellow-600 shadow-sm inline-block">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600 shadow-sm inline-block">
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="p-4 text-center text-gray-500 italic">
                                                Belum ada berita yang ditambahkan.
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