import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ kategori }) {
    // Tambahkan 'tanggal' dan 'gambar' di state form
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        category_id: '',
        tanggal: '',
        gambar: null,
        isi: ''
    });

    const submit = (e) => {
        e.preventDefault();
        // Inertia otomatis menangani upload file (multipart/form-data) jika ada file
        post(route('admin.berita.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Tambah Berita</h2>}>
            <Head title="Tambah Berita" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-blue-500">
                        <form onSubmit={submit} className="space-y-5">
                            
                            {/* Input Judul */}
                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Judul Berita</label>
                                <input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Masukkan judul berita..." />
                                {errors.judul && <div className="text-red-500 text-sm mt-1">{errors.judul}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Pilihan Kategori */}
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700">Kategori</label>
                                    <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                        <option value="">-- Pilih Kategori --</option>
                                        {kategori && kategori.map(kat => (
                                            <option key={kat.id} value={kat.id}>{kat.nama}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                                </div>

                                {/* Input Tanggal */}
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700">Tanggal Publikasi</label>
                                    <input type="date" value={data.tanggal} onChange={e => setData('tanggal', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                    {errors.tanggal && <div className="text-red-500 text-sm mt-1">{errors.tanggal}</div>}
                                </div>
                            </div>

                            {/* Input Gambar/Foto */}
                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Upload Foto/Thumbnail (Opsional)</label>
                                {/* Untuk file, kita tangkap e.target.files[0] */}
                                <input type="file" accept="image/*" onChange={e => setData('gambar', e.target.files[0])} className="w-full border border-gray-300 rounded p-2 text-gray-700 bg-gray-50" />
                                {errors.gambar && <div className="text-red-500 text-sm mt-1">{errors.gambar}</div>}
                            </div>

                            {/* Input Isi Berita */}
                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Isi Berita</label>
                                <textarea rows="8" value={data.isi} onChange={e => setData('isi', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ketik isi lengkap berita di sini..."></textarea>
                                {errors.isi && <div className="text-red-500 text-sm mt-1">{errors.isi}</div>}
                            </div>

                            {/* Tombol Simpan */}
                            <div className="flex justify-between items-center mt-6 pt-4 border-t">
                                <Link href={route('admin.berita.index')} className="text-gray-500 hover:text-gray-800 font-medium">Batal</Link>
                                <button type="submit" disabled={processing} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-50">
                                    {processing ? 'Menyimpan...' : 'Simpan Berita'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}