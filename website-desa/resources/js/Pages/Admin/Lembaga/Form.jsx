import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ auth, lembaga }) {
    const isEdit = !!lembaga;
    
    const { data, setData, post, put, processing, errors } = useForm({
        kategori: lembaga?.kategori || 'BPD',
        jabatan: lembaga?.jabatan || '',
        nama: lembaga?.nama || '',
        alamat_atau_keterangan: lembaga?.alamat_atau_keterangan || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.lembaga.update', lembaga.id));
        } else {
            post(route('admin.lembaga.store'));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">{isEdit ? 'Edit Lembaga' : 'Tambah Lembaga'}</h2>}>
            <Head title={isEdit ? 'Edit Lembaga' : 'Tambah Lembaga'} />

            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                    <form onSubmit={submit} className="space-y-6">
                        
                        <div>
                            <InputLabel htmlFor="kategori" value="Kategori Lembaga" />
                            <select
                                id="kategori"
                                className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                                value={data.kategori}
                                onChange={(e) => setData('kategori', e.target.value)}
                            >
                                <option value="BPD">BPD</option>
                                <option value="LKMD">LKMD</option>
                                <option value="TPK">TPK</option>
                                <option value="KPMD">KPMD</option>
                                <option value="PKK">PKK</option>
                                <option value="RT_RW">RT / RW</option>
                                <option value="ORMAS">ORMAS / PEMUDA</option>
                            </select>
                            <InputError message={errors.kategori} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="nama" value="Nama Lengkap / Nama Wilayah (Wajib)" />
                            <TextInput id="nama" className="mt-1 block w-full" value={data.nama} onChange={(e) => setData('nama', e.target.value)} required />
                            <InputError message={errors.nama} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="jabatan" value="Jabatan (Opsional)" />
                            <TextInput id="jabatan" className="mt-1 block w-full" value={data.jabatan} onChange={(e) => setData('jabatan', e.target.value)} placeholder="Contoh: Ketua, Anggota, Ketua RT 01" />
                            <InputError message={errors.jabatan} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="alamat_atau_keterangan" value="Alamat / Dusun / Keterangan (Opsional)" />
                            <TextInput id="alamat_atau_keterangan" className="mt-1 block w-full" value={data.alamat_atau_keterangan} onChange={(e) => setData('alamat_atau_keterangan', e.target.value)} placeholder="Contoh: Dusun Dempel" />
                            <InputError message={errors.alamat_atau_keterangan} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-8">
                            <Link href={route('admin.lembaga.index')} className="text-gray-600 hover:text-gray-900">Batal</Link>
                            <PrimaryButton disabled={processing}>{isEdit ? 'Simpan Perubahan' : 'Tambah Data'}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}