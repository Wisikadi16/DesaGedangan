import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';

export default function Index({ auth, layananSmard }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        judul: layananSmard?.judul || 'LAYANAN DESA DENGAN APLIKASI SMARD',
        sub_judul: layananSmard?.sub_judul || '',
        paragraf_utama: layananSmard?.paragraf_utama || '',
        tujuan_poin: layananSmard?.tujuan_poin || '',
        gambar: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.layanan-smard.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Layanan Berbasis SMARD</h2>}
        >
            <Head title="Kelola Layanan SMARD" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                    <form onSubmit={submit} className="space-y-6">
                        
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Judul Utama Halaman</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-green-500 focus:ring-green-500"
                                value={data.judul}
                                onChange={(e) => setData('judul', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Sub Judul / Penjelasan Singkat SMARD</label>
                            <textarea
                                rows="3"
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-green-500 focus:ring-green-500"
                                value={data.sub_judul}
                                onChange={(e) => setData('sub_judul', e.target.value)}
                                placeholder="Contoh: SMARD (Sistem Informasi Manajemen Administrasi Desa) Dinas Kependudukan..."
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Paragraf Utama / Narasi Penjelasan</label>
                            <textarea
                                rows="5"
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-green-500 focus:ring-green-500"
                                value={data.paragraf_utama}
                                onChange={(e) => setData('paragraf_utama', e.target.value)}
                                placeholder="Tuliskan sejarah atau deskripsi aplikasi SMARD di desa..."
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Tujuan Layanan (Tuliskan per baris / enter ke bawah)</label>
                            <textarea
                                rows="6"
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-green-500 focus:ring-green-500"
                                value={data.tujuan_poin}
                                onChange={(e) => setData('tujuan_poin', e.target.value)}
                                placeholder="Contoh:&#10;Meningkatkan kelancaran pelayanan ADMINDUK...&#10;Layanan ini diperlukan untuk Sistem Informasi Desa..."
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Upload Gambar / Screenshot SMARD</label>
                            {layananSmard?.gambar && (
                                <div className="mb-3">
                                    <img src={`/storage/${layananSmard.gambar}`} alt="SMARD Preview" className="h-40 rounded-xl object-cover border" />
                                </div>
                            )}
                            <input
                                type="file"
                                className="w-full border border-gray-300 rounded-xl p-2 bg-gray-50 text-sm"
                                onChange={(e) => setData('gambar', e.target.files[0])}
                            />
                            <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, WEBP (Maksimal 2MB).</p>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-green-600 font-bold">✅ Berhasil Disimpan!</p>
                            </Transition>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}