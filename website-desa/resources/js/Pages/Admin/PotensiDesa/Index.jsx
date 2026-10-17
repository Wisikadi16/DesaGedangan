import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, potensi }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        judul: '',
        kategori: 'Pariwisata',
        konten: '',
        tanggal: '',
        gambar: null,
    });

    const openAddModal = () => {
        setEditMode(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditMode(true);
        setSelectedId(item.id);
        setData({
            judul: item.judul,
            kategori: item.kategori,
            konten: item.konten,
            tanggal: item.tanggal,
            gambar: null, // Kosongkan, hanya diisi kalau mau ganti gambar
        });
        setIsModalOpen(true);
    };

    const openDeleteModal = (id) => {
        setSelectedId(id);
        setIsDeleteModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editMode) {
            // Menggunakan router.post dengan _method: 'put' untuk Method Spoofing
            // karena HTML tidak bisa upload file lewat method PUT murni.
            router.post(route('admin.potensi-desa.update', selectedId), {
                _method: 'put',
                judul: data.judul,
                kategori: data.kategori,
                konten: data.konten,
                tanggal: data.tanggal,
                gambar: data.gambar,
            }, {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.potensi-desa.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deletePotensi = () => {
        router.delete(route('admin.potensi-desa.destroy', selectedId), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Potensi Desa</h2>}
        >
            <Head title="Kelola Potensi Desa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800">Daftar Potensi Desa</h3>
                            <button
                                onClick={openAddModal}
                                className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                            >
                                + Tambah Potensi
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3">Gambar</th>
                                        <th className="px-6 py-3">Judul</th>
                                        <th className="px-6 py-3">Kategori</th>
                                        <th className="px-6 py-3">Tanggal</th>
                                        <th className="px-6 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {potensi && potensi.length > 0 ? (
                                        potensi.map((item) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    {item.gambar ? (
                                                        <img src={`/storage/${item.gambar}`} alt={item.judul} className="h-12 w-16 object-cover rounded" />
                                                    ) : (
                                                        <span className="text-gray-400 italic text-xs">No image</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-bold text-gray-900">{item.judul}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">
                                                        {item.kategori}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">{item.tanggal}</td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button type="button" onClick={() => openEditModal(item)} className="text-blue-600 font-bold hover:underline">Edit</button>
                                                    <button type="button" onClick={() => openDeleteModal(item.id)} className="text-red-600 font-bold hover:underline">Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">Belum ada data potensi desa.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tambah/Edit */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={submit} className="p-6 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        {editMode ? 'Edit Potensi Desa' : 'Tambah Potensi Desa'}
                    </h2>

                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Judul Artikel</label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData('judul', e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                        {errors.judul && <p className="text-red-500 text-xs mt-1 font-bold">{errors.judul}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold text-gray-700 mb-1">Kategori</label>
                            <select
                                value={data.kategori}
                                onChange={(e) => setData('kategori', e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                            >
                                <option value="Pariwisata">Pariwisata</option>
                                <option value="Pasar Desa">Pasar Desa</option>
                                <option value="Kesenian">Kesenian</option>
                            </select>
                            {errors.kategori && <p className="text-red-500 text-xs mt-1 font-bold">{errors.kategori}</p>}
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-1">Tanggal Rilis</label>
                            <input
                                type="date"
                                value={data.tanggal}
                                onChange={(e) => setData('tanggal', e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                            {errors.tanggal && <p className="text-red-500 text-xs mt-1 font-bold">{errors.tanggal}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Konten / Isi Cerita</label>
                        <textarea
                            rows="5"
                            value={data.konten}
                            onChange={(e) => setData('konten', e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        ></textarea>
                        {errors.konten && <p className="text-red-500 text-xs mt-1 font-bold">{errors.konten}</p>}
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Gambar / Thumbnail</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            onChange={(e) => setData('gambar', e.target.files[0])}
                            className="w-full border-gray-300 rounded-lg p-2 bg-gray-50 text-sm"
                        />
                        {editMode && <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah gambar.</p>}
                        {errors.gambar && <p className="text-red-500 text-xs mt-1 font-bold">{errors.gambar}</p>}
                    </div>

                    <div className="flex justify-end pt-4 border-t gap-2">
                        <SecondaryButton type="button" onClick={closeModal}>Batal</SecondaryButton>
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal Hapus */}
            <Modal show={isDeleteModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Hapus Data Potensi?</h2>
                    <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus data ini? Data yang dihapus tidak dapat dikembalikan.</p>
                    <div className="flex justify-end gap-2">
                        <SecondaryButton type="button" onClick={closeModal}>Batal</SecondaryButton>
                        <DangerButton onClick={deletePotensi}>Ya, Hapus</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}