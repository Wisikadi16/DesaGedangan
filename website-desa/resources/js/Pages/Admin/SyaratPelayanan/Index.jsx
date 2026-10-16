import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Index({ auth, syaratPelayanans }) {
    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        id: null,
        judul_layanan: '',
        ikon: '📄',
        daftar_syarat: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.syarat-pelayanan.update', data.id), {
                onSuccess: () => { reset(); setIsEditing(false); }
            });
        } else {
            post(route('admin.syarat-pelayanan.store'), {
                onSuccess: () => { reset(); }
            });
        }
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setData({
            id: item.id,
            judul_layanan: item.judul_layanan,
            ikon: item.ikon || '📄',
            daftar_syarat: item.daftar_syarat,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kategori layanan ini?')) {
            destroy(route('admin.syarat-pelayanan.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Syarat Pelayanan Administrasi</h2>}
        >
            <Head title="Kelola Syarat Pelayanan" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                
                {/* Form Input / Edit */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        {isEditing ? '✏️ Edit Kategori Layanan' : '➕ Tambah Kategori Layanan Baru'}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium text-sm text-gray-700 mb-1">Judul Layanan (Contoh: KARTU KELUARGA)</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-green-500 focus:ring-green-500"
                                value={data.judul_layanan}
                                onChange={(e) => setData('judul_layanan', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm text-gray-700 mb-1">Daftar Syarat (Tuliskan per baris/enter ke bawah)</label>
                            <textarea
                                rows="6"
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-green-500 focus:ring-green-500"
                                value={data.daftar_syarat}
                                onChange={(e) => setData('daftar_syarat', e.target.value)}
                                placeholder="Contoh:&#10;Pengantar RT dan RW&#10;Pelunasan Pajak PBB&#10;Foto Copy KSK"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition"
                            >
                                {isEditing ? 'Perbarui Data' : 'Simpan Kategori'}
                            </button>

                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => { reset(); setIsEditing(false); }}
                                    className="px-5 py-2.5 bg-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-400 transition"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Daftar Kategori yang sudah ada */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Daftar Layanan Saat Ini</h3>

                    <div className="space-y-4">
                        {syaratPelayanans.length === 0 ? (
                            <p className="text-gray-500 italic text-center py-6">Belum ada data syarat pelayanan.</p>
                        ) : (
                            syaratPelayanans.map((item) => (
                                <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-xl border border-gray-200 gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl p-2 bg-white rounded-lg shadow-sm">{item.ikon || '📄'}</span>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.judul_layanan}</h4>
                                            <p className="text-xs text-gray-500">{item.daftar_syarat.split('\n').length} item persyaratan</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(item)}
                                            className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item.id)}
                                            className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}