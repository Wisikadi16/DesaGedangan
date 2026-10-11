import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_umkm: '',
        pemilik: '',
        whatsapp: '',
        deskripsi: '',
        gambar: null // State untuk foto
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.umkm.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Tambah UMKM Baru</h2>}>
            <Head title="Tambah UMKM" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-green-500">
                        <form onSubmit={submit} className="space-y-5">
                            
                            {/* Input Foto */}
                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Foto Usaha / Produk (Opsional)</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={e => setData('gambar', e.target.files[0])} 
                                    className="w-full border border-gray-300 rounded shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                                />
                                {errors.gambar && <div className="text-red-500 text-sm mt-1">{errors.gambar}</div>}
                            </div>

                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Nama Usaha / UMKM</label>
                                <input type="text" value={data.nama_umkm} onChange={e => setData('nama_umkm', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-green-500 focus:border-green-500" />
                                {errors.nama_umkm && <div className="text-red-500 text-sm mt-1">{errors.nama_umkm}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700">Nama Pemilik</label>
                                    <input type="text" value={data.pemilik} onChange={e => setData('pemilik', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-green-500 focus:border-green-500" />
                                    {errors.pemilik && <div className="text-red-500 text-sm mt-1">{errors.pemilik}</div>}
                                </div>
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700">Nomor WhatsApp</label>
                                    <input type="text" value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-green-500 focus:border-green-500" />
                                    {errors.whatsapp && <div className="text-red-500 text-sm mt-1">{errors.whatsapp}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Deskripsi</label>
                                <textarea rows="5" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-green-500 focus:border-green-500"></textarea>
                                {errors.deskripsi && <div className="text-red-500 text-sm mt-1">{errors.deskripsi}</div>}
                            </div>

                            <div className="flex justify-end pt-4 border-t space-x-4">
                                <Link href={route('admin.umkm.index')} className="text-gray-500 px-4 py-2 hover:bg-gray-100 rounded">Batal</Link>
                                <button type="submit" disabled={processing} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700">
                                    {processing ? 'Menyimpan...' : 'Simpan UMKM'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}