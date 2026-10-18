import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Field, { inputClass } from '@/Components/FormField';
import { Head, Link, useForm } from '@inertiajs/react';

// Satu form untuk Tambah (dusun = null) dan Edit (dusun = data yang ada)
export default function Form({ dusun }) {
    const edit = !!dusun;

    const { data, setData, post, put, processing, errors } = useForm({
        nama_dusun: dusun?.nama_dusun ?? '',
        nama_kepala_dusun: dusun?.nama_kepala_dusun ?? '',
        jumlah_penduduk: dusun?.jumlah_penduduk ?? 0,
        alamat: dusun?.alamat ?? '',
        deskripsi: dusun?.deskripsi ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (edit && dusun?.id) {
            // Menggunakan URL path manual agar bebas dari error parameter Ziggy
            put(`/admin/dusun/${dusun.id}`);
        } else {
            post('/admin/dusun');
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">{edit ? 'Edit Dusun' : 'Tambah Dusun'}</h2>}>
            <Head title={edit ? 'Edit Dusun' : 'Tambah Dusun'} />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className={`bg-white p-6 shadow-sm sm:rounded-lg border-t-4 ${edit ? 'border-yellow-500' : 'border-green-500'}`}>
                        <form onSubmit={submit} className="space-y-5">
                            <Field label="Nama Dusun" error={errors.nama_dusun}>
                                <input type="text" value={data.nama_dusun} onChange={(e) => setData('nama_dusun', e.target.value)} className={inputClass} placeholder="Contoh: Dusun Krajan" required />
                            </Field>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Nama Kepala Dusun" error={errors.nama_kepala_dusun}>
                                    <input type="text" value={data.nama_kepala_dusun} onChange={(e) => setData('nama_kepala_dusun', e.target.value)} className={inputClass} />
                                </Field>
                                <Field label="Jumlah Penduduk" error={errors.jumlah_penduduk}>
                                    <input type="number" min="0" value={data.jumlah_penduduk} onChange={(e) => setData('jumlah_penduduk', e.target.value)} className={inputClass} />
                                </Field>
                            </div>

                            <Field label="Alamat / Letak (Opsional)" error={errors.alamat}>
                                <input type="text" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} className={inputClass} placeholder="Contoh: RT 01-03 RW 01, sisi utara desa" />
                            </Field>

                            <Field label="Keterangan (Opsional)" error={errors.deskripsi}>
                                <textarea rows="4" value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className={inputClass} />
                            </Field>

                            <div className="flex justify-end pt-4 border-t space-x-4">
                                <Link href={route('admin.dusun.index')} className="text-gray-500 px-4 py-2 hover:bg-gray-100 rounded">
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