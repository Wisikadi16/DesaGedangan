import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Field, { inputClass } from '@/Components/FormField';
import { Head, Link, useForm } from '@inertiajs/react';

// Satu form untuk Tambah (perangkat = null) dan Edit (perangkat = data yang ada)
export default function Form({ perangkat }) {
    const edit = !!perangkat;

    const { data, setData, post, processing, errors } = useForm({
        nama: perangkat?.nama ?? '',
        jabatan: perangkat?.jabatan ?? '',
        telepon: perangkat?.telepon ?? '',
        urutan: perangkat?.urutan ?? '',
        deskripsi: perangkat?.deskripsi ?? '',
        foto: null,
        // Trik agar upload file tetap jalan saat Edit (Laravel menerima POST yang menyamar sebagai PUT)
        ...(edit ? { _method: 'put' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        post(edit ? route('admin.pemerintahan.update', perangkat.id) : route('admin.pemerintahan.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">{edit ? 'Edit Perangkat Desa' : 'Tambah Perangkat Desa'}</h2>}>
            <Head title={edit ? 'Edit Perangkat Desa' : 'Tambah Perangkat Desa'} />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className={`bg-white p-6 shadow-sm sm:rounded-lg border-t-4 ${edit ? 'border-yellow-500' : 'border-green-500'}`}>
                        <form onSubmit={submit} className="space-y-5">
                            <Field label="Foto (Opsional)" error={errors.foto} hint={edit ? 'Kosongkan jika tidak ingin mengubah foto. ' + 'Disarankan foto potret (rasio 3:4), maks. 5 MB.' : 'Disarankan foto potret (rasio 3:4), maks. 5 MB.'}>
                                {perangkat?.foto && (
                                    <img src={`/storage/${perangkat.foto}`} alt={perangkat.nama} className="mb-3 h-40 w-32 object-cover rounded shadow" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('foto', e.target.files[0] || null)}
                                    className="w-full border border-gray-300 rounded shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                            </Field>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Nama Lengkap" error={errors.nama}>
                                    <input type="text" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className={inputClass} />
                                </Field>
                                <Field label="Jabatan" error={errors.jabatan}>
                                    <input type="text" value={data.jabatan} onChange={(e) => setData('jabatan', e.target.value)} className={inputClass} placeholder="Contoh: Kepala Desa" />
                                </Field>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Telepon (Opsional)" error={errors.telepon} hint="Jika diisi, nomor ini tampil di halaman publik.">
                                    <input type="text" value={data.telepon} onChange={(e) => setData('telepon', e.target.value)} className={inputClass} />
                                </Field>
                                <Field label="Urutan Tampil" error={errors.urutan} hint="Angka kecil tampil lebih dulu. Kosongkan agar otomatis di paling akhir.">
                                    <input type="number" min="0" value={data.urutan} onChange={(e) => setData('urutan', e.target.value)} className={inputClass} />
                                </Field>
                            </div>

                            <Field label="Keterangan Singkat (Opsional)" error={errors.deskripsi}>
                                <textarea rows="3" value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className={inputClass} />
                            </Field>

                            <div className="flex justify-end pt-4 border-t space-x-4">
                                <Link href={route('admin.pemerintahan.index')} className="text-gray-500 px-4 py-2 hover:bg-gray-100 rounded">
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`${edit ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white px-6 py-2 rounded-lg font-bold disabled:opacity-60`}
                                >
                                    {processing ? 'Menyimpan...' : edit ? 'Perbarui' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}