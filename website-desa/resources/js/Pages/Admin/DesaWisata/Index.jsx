import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';

export default function Index({ auth, desaWisata }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        narasi_utama: desaWisata?.narasi_utama || '',
        visi_misi: desaWisata?.visi_misi || '',
        sarana: desaWisata?.sarana || '',
        obyek_wisata: desaWisata?.obyek_wisata || '',
        kuliner_ndeso: desaWisata?.kuliner_ndeso || '',
        even: desaWisata?.even || '',
        info_paket: desaWisata?.info_paket || '',
        pokdarwis: desaWisata?.pokdarwis || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.desa-wisata.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Konten Desa Wisata</h2>}
        >
            <Head title="Kelola Desa Wisata" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-2xl p-6 md:p-10 border border-gray-100">
                        <form onSubmit={submit}>
                            
                            <div className="mb-10 p-6 bg-green-50 border border-green-100 rounded-2xl">
                                <h3 className="text-lg font-extrabold text-green-800 mb-4">📝 Artikel Utama / Narasi</h3>
                                <textarea
                                    className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-xl shadow-sm"
                                    rows="10"
                                    value={data.narasi_utama}
                                    onChange={(e) => setData('narasi_utama', e.target.value)}
                                    placeholder="Tulis narasi panjang di sini..."
                                />
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-extrabold text-gray-800 mb-6 pb-2 border-b border-gray-200">🗂️ Isi Konten Tab Menu</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    
                                    <div>
                                        <label className="block font-bold text-gray-700 mb-2">Visi dan Misi</label>
                                        <textarea className="w-full border-gray-300 rounded-xl" rows="4" value={data.visi_misi} onChange={(e) => setData('visi_misi', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 mb-2">Sarana & Prasarana</label>
                                        <textarea className="w-full border-gray-300 rounded-xl" rows="4" value={data.sarana} onChange={(e) => setData('sarana', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 mb-2">Obyek Wisata</label>
                                        <textarea className="w-full border-gray-300 rounded-xl" rows="4" value={data.obyek_wisata} onChange={(e) => setData('obyek_wisata', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 mb-2">Kuliner Ndeso</label>
                                        <textarea className="w-full border-gray-300 rounded-xl" rows="4" value={data.kuliner_ndeso} onChange={(e) => setData('kuliner_ndeso', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 mb-2">Event / Acara</label>
                                        <textarea className="w-full border-gray-300 rounded-xl" rows="4" value={data.even} onChange={(e) => setData('even', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 mb-2">Info Paket Wisata</label>
                                        <textarea className="w-full border-gray-300 rounded-xl" rows="4" value={data.info_paket} onChange={(e) => setData('info_paket', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block font-bold text-gray-700 mb-2">Pokdarwis</label>
                                        <textarea className="w-full border-gray-300 rounded-xl" rows="4" value={data.pokdarwis} onChange={(e) => setData('pokdarwis', e.target.value)} />
                                    </div>

                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                                <button type="submit" disabled={processing} className="px-6 py-3 bg-green-600 rounded-xl font-bold text-white uppercase">
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                                <Transition show={recentlySuccessful} enter="transition" enterFrom="opacity-0" leave="transition" leaveTo="opacity-0">
                                    <p className="text-sm text-green-600 font-bold">✅ Tersimpan.</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}