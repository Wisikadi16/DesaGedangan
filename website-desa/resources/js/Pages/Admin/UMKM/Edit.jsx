import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ umkm }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_umkm: umkm?.nama_umkm || '',
        pemilik: umkm?.pemilik || '',
        kategori: umkm?.kategori || '',
        whatsapp: umkm?.whatsapp || '',
        deskripsi: umkm?.deskripsi || '',
        produk: umkm?.produk || '',
        alamat: umkm?.alamat || '',
        google_maps_url: umkm?.google_maps_url || '',
        gambar: null,
        _method: 'put' // Trik untuk upload file saat method PUT/Edit di Laravel
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.umkm.update', umkm.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Edit Data UMKM</h2>}>
            <Head title="Edit UMKM" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-yellow-500">
                        <form onSubmit={submit} className="space-y-5">
                            
                            {/* Preview Foto Lama */}
                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Foto Usaha / Produk (Opsional)</label>
                                {umkm?.gambar && (
                                    <div className="mb-3">
                                        <img src={`/storage/${umkm.gambar}`} alt={umkm.nama_umkm} className="h-32 object-cover rounded shadow" />
                                    </div>
                                )}
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={e => setData('gambar', e.target.files[0])} 
                                    className="w-full border border-gray-300 rounded shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100" 
                                />
                                <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah foto.</p>
                                {errors.gambar && <div className="text-red-500 text-sm mt-1">{errors.gambar}</div>}
                            </div>

                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Nama Usaha / UMKM</label>
                                <input type="text" value={data.nama_umkm} onChange={e => setData('nama_umkm', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
                                {errors.nama_umkm && <div className="text-red-500 text-sm mt-1">{errors.nama_umkm}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700">Nama Pemilik</label>
                                    <input type="text" value={data.pemilik} onChange={e => setData('pemilik', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
                                    {errors.pemilik && <div className="text-red-500 text-sm mt-1">{errors.pemilik}</div>}
                                </div>
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700">Nomor WhatsApp</label>
                                    <input type="text" value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
                                    {errors.whatsapp && <div className="text-red-500 text-sm mt-1">{errors.whatsapp}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700">Kategori Usaha</label>
                                    <select value={data.kategori} onChange={e => setData('kategori', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-yellow-500 focus:border-yellow-500">
                                        <option value="">Pilih Kategori</option>
                                        <option value="Kuliner">Kuliner</option>
                                        <option value="Kerajinan">Kerajinan / Handicraft</option>
                                        <option value="Jasa">Jasa</option>
                                        <option value="Pertanian">Pertanian / Peternakan</option>
                                    </select>
                                    {errors.kategori && <div className="text-red-500 text-sm mt-1">{errors.kategori}</div>}
                                </div>
                                <div>
                                    <label className="block font-bold mb-1 text-gray-700">Alamat / Dusun</label>
                                    <input type="text" value={data.alamat} onChange={e => setData('alamat', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-yellow-500 focus:border-yellow-500" placeholder="Contoh: Dusun Gedangan" />
                                    {errors.alamat && <div className="text-red-500 text-sm mt-1">{errors.alamat}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Produk Unggulan</label>
                                <input type="text" value={data.produk} onChange={e => setData('produk', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-yellow-500 focus:border-yellow-500" placeholder="Contoh: Keripik Singkong, Madu" />
                                {errors.produk && <div className="text-red-500 text-sm mt-1">{errors.produk}</div>}
                            </div>

                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Link Google Maps (URL)</label>
                                <input type="url" value={data.google_maps_url} onChange={e => setData('google_maps_url', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-yellow-500 focus:border-yellow-500" placeholder="https://goo.gl/maps/..." />
                                {errors.google_maps_url && <div className="text-red-500 text-sm mt-1">{errors.google_maps_url}</div>}
                            </div>

                            <div>
                                <label className="block font-bold mb-1 text-gray-700">Deskripsi</label>
                                <textarea rows="5" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} className="w-full border-gray-300 rounded shadow-sm focus:ring-yellow-500 focus:border-yellow-500"></textarea>
                                {errors.deskripsi && <div className="text-red-500 text-sm mt-1">{errors.deskripsi}</div>}
                            </div>

                            <div className="flex justify-end pt-4 border-t space-x-4">
                                <Link href={route('admin.umkm.index')} className="text-gray-500 px-4 py-2 hover:bg-gray-100 rounded">Batal</Link>
                                <button type="submit" disabled={processing} className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-700">
                                    {processing ? 'Menyimpan...' : 'Perbarui UMKM'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}