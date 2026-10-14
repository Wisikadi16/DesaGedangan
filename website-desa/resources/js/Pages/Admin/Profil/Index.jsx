import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, profil }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        nama_desa: profil?.nama_desa || '',
        kecamatan: profil?.kecamatan || '',
        kabupaten: profil?.kabupaten || '',
        provinsi: profil?.provinsi || '',
        sejarah: profil?.sejarah || '',
        visi: profil?.visi || '',
        misi: profil?.misi || '',
        potensi: profil?.potensi || '',
        masalah: profil?.masalah || '',
        kondisi_umum: profil?.kondisi_umum || '',
        
        // Data Geografis & Wilayah
        letak_geografis: profil?.letak_geografis || '',
        ketinggian: profil?.ketinggian || '',
        luas_wilayah: profil?.luas_wilayah || '',
        batas_utara: profil?.batas_utara || '',
        batas_selatan: profil?.batas_selatan || '',
        batas_timur: profil?.batas_timur || '',
        batas_barat: profil?.batas_barat || '',
        
        iklim: profil?.iklim || '',
        suhu: profil?.suhu || '',
        curah_hujan: profil?.curah_hujan || '',
        kelembaban: profil?.kelembaban || '',
        
        luas_datar: profil?.luas_datar || '',
        luas_pegunungan: profil?.luas_pegunungan || '',
        sawah_irigasi: profil?.sawah_irigasi || '',
        pemukiman: profil?.pemukiman || '',

        // Data Penduduk Utama
        jumlah_laki_laki: profil?.jumlah_laki_laki || '',
        jumlah_perempuan: profil?.jumlah_perempuan || '',
        jumlah_kk: profil?.jumlah_kk || '',

        // Data Dinamis (JSON / Array)
        kelompok_umur: profil?.kelompok_umur || [],
        pekerjaan: profil?.pekerjaan || [],
        agama: profil?.agama || [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.update'));
    };

    const addDynamicRow = (field, defaultObject) => {
        setData(field, [...data[field], defaultObject]);
    };

    const removeDynamicRow = (field, index) => {
        const newData = [...data[field]];
        newData.splice(index, 1);
        setData(field, newData);
    };

    const handleDynamicChange = (field, index, key, value) => {
        const newData = [...data[field]];
        newData[index][key] = value;
        setData(field, newData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pengaturan Profil Desa</h2>}
        >
            <Head title="Profil Desa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {recentlySuccessful && (
                        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            Data profil desa berhasil diperbarui!
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-8">
                        
                        {/* SECTION 1: DATA UTAMA */}
                        <div className="bg-white p-6 shadow sm:rounded-lg space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Informasi Utama & Sejarah</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><InputLabel value="Nama Desa" /><TextInput value={data.nama_desa} onChange={(e) => setData('nama_desa', e.target.value)} className="mt-1 block w-full" /></div>
                                <div><InputLabel value="Kecamatan" /><TextInput value={data.kecamatan} onChange={(e) => setData('kecamatan', e.target.value)} className="mt-1 block w-full" /></div>
                                <div><InputLabel value="Kabupaten" /><TextInput value={data.kabupaten} onChange={(e) => setData('kabupaten', e.target.value)} className="mt-1 block w-full" /></div>
                                <div><InputLabel value="Provinsi" /><TextInput value={data.provinsi} onChange={(e) => setData('provinsi', e.target.value)} className="mt-1 block w-full" /></div>
                            </div>
                            <div>
                                <InputLabel value="Sejarah Desa" />
                                <textarea value={data.sejarah} onChange={(e) => setData('sejarah', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm h-32"></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel value="Visi" />
                                    <textarea value={data.visi} onChange={(e) => setData('visi', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-24"></textarea>
                                </div>
                                <div>
                                    <InputLabel value="Misi" />
                                    <textarea value={data.misi} onChange={(e) => setData('misi', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-24"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: KONDISI WILAYAH & GEOGRAFIS */}
                        <div className="bg-white p-6 shadow sm:rounded-lg space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Kondisi Wilayah & Geografis</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div><InputLabel value="Letak Geografis (Koordinat)" /><TextInput value={data.letak_geografis} onChange={(e) => setData('letak_geografis', e.target.value)} className="mt-1 block w-full" placeholder="110.4625 BT dan -7.332 LS" /></div>
                                <div><InputLabel value="Ketinggian dari Permukaan Laut" /><TextInput value={data.ketinggian} onChange={(e) => setData('ketinggian', e.target.value)} className="mt-1 block w-full" placeholder="500 mdpl" /></div>
                                <div><InputLabel value="Total Luas Wilayah" /><TextInput value={data.luas_wilayah} onChange={(e) => setData('luas_wilayah', e.target.value)} className="mt-1 block w-full" placeholder="267,707 Ha" /></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-sm mb-3 text-gray-700">Batas Wilayah</h4>
                                    <div className="space-y-3">
                                        <div><InputLabel value="Utara" /><TextInput value={data.batas_utara} onChange={(e) => setData('batas_utara', e.target.value)} className="mt-1 block w-full" /></div>
                                        <div><InputLabel value="Selatan" /><TextInput value={data.batas_selatan} onChange={(e) => setData('batas_selatan', e.target.value)} className="mt-1 block w-full" /></div>
                                        <div><InputLabel value="Timur" /><TextInput value={data.batas_timur} onChange={(e) => setData('batas_timur', e.target.value)} className="mt-1 block w-full" /></div>
                                        <div><InputLabel value="Barat" /><TextInput value={data.batas_barat} onChange={(e) => setData('batas_barat', e.target.value)} className="mt-1 block w-full" /></div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-sm mb-3 text-gray-700">Klimatologi</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><InputLabel value="Iklim" /><TextInput value={data.iklim} onChange={(e) => setData('iklim', e.target.value)} className="mt-1 block w-full" placeholder="Tropis" /></div>
                                            <div><InputLabel value="Suhu Udara" /><TextInput value={data.suhu} onChange={(e) => setData('suhu', e.target.value)} className="mt-1 block w-full" placeholder="20 - 30 C" /></div>
                                            <div><InputLabel value="Curah Hujan" /><TextInput value={data.curah_hujan} onChange={(e) => setData('curah_hujan', e.target.value)} className="mt-1 block w-full" placeholder="3000 mm" /></div>
                                            <div><InputLabel value="Kelembaban" /><TextInput value={data.kelembaban} onChange={(e) => setData('kelembaban', e.target.value)} className="mt-1 block w-full" /></div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-3 text-gray-700">Topografi & Tata Guna Lahan</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><InputLabel value="Tanah Datar" /><TextInput value={data.luas_datar} onChange={(e) => setData('luas_datar', e.target.value)} className="mt-1 block w-full" placeholder="196,713 Ha" /></div>
                                            <div><InputLabel value="Pegunungan" /><TextInput value={data.luas_pegunungan} onChange={(e) => setData('luas_pegunungan', e.target.value)} className="mt-1 block w-full" placeholder="70,994 Ha" /></div>
                                            <div><InputLabel value="Sawah Teririgasi" /><TextInput value={data.sawah_irigasi} onChange={(e) => setData('sawah_irigasi', e.target.value)} className="mt-1 block w-full" placeholder="30,500 Ha" /></div>
                                            <div><InputLabel value="Pemukiman" /><TextInput value={data.pemukiman} onChange={(e) => setData('pemukiman', e.target.value)} className="mt-1 block w-full" placeholder="60 Ha" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: PROFIL KEPENDUDUKAN (DINAMIS UI) */}
                        <div className="bg-white p-6 shadow sm:rounded-lg space-y-8">
                            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Profil Kependudukan & Demografi</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded border">
                                <div><InputLabel value="Total Laki-laki (Jiwa)" /><TextInput type="number" value={data.jumlah_laki_laki} onChange={(e) => setData('jumlah_laki_laki', e.target.value)} className="mt-1 block w-full" /></div>
                                <div><InputLabel value="Total Perempuan (Jiwa)" /><TextInput type="number" value={data.jumlah_perempuan} onChange={(e) => setData('jumlah_perempuan', e.target.value)} className="mt-1 block w-full" /></div>
                                <div><InputLabel value="Total Kepala Keluarga (KK)" /><TextInput type="number" value={data.jumlah_kk} onChange={(e) => setData('jumlah_kk', e.target.value)} className="mt-1 block w-full" /></div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* FORM DINAMIS: PEKERJAAN */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-gray-700">Data Pekerjaan</h4>
                                        <button type="button" onClick={() => addDynamicRow('pekerjaan', { nama: '', jumlah: '' })} className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition">
                                            + Tambah Pekerjaan
                                        </button>
                                    </div>
                                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                        {data.pekerjaan.map((item, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <TextInput value={item.nama} onChange={(e) => handleDynamicChange('pekerjaan', index, 'nama', e.target.value)} className="w-full text-sm" placeholder="Nama Pekerjaan" />
                                                <TextInput type="number" value={item.jumlah} onChange={(e) => handleDynamicChange('pekerjaan', index, 'jumlah', e.target.value)} className="w-24 text-sm" placeholder="Jml" />
                                                <button type="button" onClick={() => removeDynamicRow('pekerjaan', index)} className="p-2 text-red-500 hover:bg-red-50 rounded font-bold">✖</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FORM DINAMIS: AGAMA */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-gray-700">Data Agama</h4>
                                        <button type="button" onClick={() => addDynamicRow('agama', { nama: '', jumlah: '' })} className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition">
                                            + Tambah Agama
                                        </button>
                                    </div>
                                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                        {data.agama.map((item, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <TextInput value={item.nama} onChange={(e) => handleDynamicChange('agama', index, 'nama', e.target.value)} className="w-full text-sm" placeholder="Agama" />
                                                <TextInput type="number" value={item.jumlah} onChange={(e) => handleDynamicChange('agama', index, 'jumlah', e.target.value)} className="w-24 text-sm" placeholder="Jml" />
                                                <button type="button" onClick={() => removeDynamicRow('agama', index)} className="p-2 text-red-500 hover:bg-red-50 rounded font-bold">✖</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FORM DINAMIS: KELOMPOK UMUR */}
                                <div className="lg:col-span-2">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-gray-700">Data Kelompok Usia</h4>
                                        <button type="button" onClick={() => addDynamicRow('kelompok_umur', { rentang: '', laki: '', perempuan: '' })} className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition">
                                            + Tambah Rentang Usia
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                                        {data.kelompok_umur.map((item, index) => (
                                            <div key={index} className="flex gap-2 items-center bg-gray-50 p-2 rounded border">
                                                <TextInput value={item.rentang} onChange={(e) => handleDynamicChange('kelompok_umur', index, 'rentang', e.target.value)} className="w-1/3 text-sm" placeholder="Usia (0-4)" />
                                                <TextInput type="number" value={item.laki} onChange={(e) => handleDynamicChange('kelompok_umur', index, 'laki', e.target.value)} className="w-1/3 text-sm" placeholder="Laki" />
                                                <TextInput type="number" value={item.perempuan} onChange={(e) => handleDynamicChange('kelompok_umur', index, 'perempuan', e.target.value)} className="w-1/3 text-sm" placeholder="Pr" />
                                                <button type="button" onClick={() => removeDynamicRow('kelompok_umur', index)} className="p-1 text-red-500 hover:bg-red-100 rounded font-bold">✖</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <PrimaryButton className="ml-4 bg-green-600 hover:bg-green-700" disabled={processing}>
                                Simpan Semua Perubahan
                            </PrimaryButton>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}