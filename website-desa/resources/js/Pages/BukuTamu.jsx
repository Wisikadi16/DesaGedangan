import { Head, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { inputClass } from '@/Components/FormField';

export default function BukuTamu({ auth, profil, pesanTerbaru }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        nama: '',
        telepon: '',
        perihal: '',
        pesan: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('buku-tamu.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title="Buku Tamu & Aspirasi Warga" />

            <div className="bg-gray-50 text-gray-800 font-sans py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Header Informasi Kontak Desa */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Buku Tamu & Aspirasi Warga</h1>
                        <p className="text-gray-600 mb-6">
                            Sampaikan kritik, saran, masukan, atau pertanyaan seputar Pemerintahan Desa Gedangan melalui formulir di bawah ini.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-green-50 p-6 rounded-2xl text-sm text-green-900 border border-green-100">
                            <div>
                                <p className="font-bold text-green-800 mb-1">📍 Alamat Kantor Desa</p>
                                <p>{profil?.alamat || 'Jl. Salatiga – Banyubiru Desa Gedangan Kec. Tuntang Kab. Semarang Jawa Tengah 50773'}</p>
                            </div>
                            <div>
                                <p className="font-bold text-green-800 mb-1">📞 Kontak & Layanan</p>
                                <p>Telepon: {profil?.telepon || '(0298) 6031115'}</p>
                                <p>Email: {profil?.email || 'pemerintahdesagedangan@gmail.com'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Notifikasi Sukses */}
                    {flash.message && (
                        <div className="bg-green-600 text-white p-4 rounded-xl shadow-sm font-medium text-center">
                            {flash.message}
                        </div>
                    )}

                    {/* Form Kirim Pesan */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Tulis Pesan / Masukan</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap *</label>
                                    <input 
                                        type="text" 
                                        value={data.nama} 
                                        onChange={e => setData('nama', e.target.value)} 
                                        className={inputClass} 
                                        placeholder="Contoh: Budi Santoso" 
                                        required 
                                    />
                                    {errors.nama && <span className="text-red-500 text-xs">{errors.nama}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">No. Telepon / WhatsApp (Opsional)</label>
                                    <input 
                                        type="text" 
                                        value={data.telepon} 
                                        onChange={e => setData('telepon', e.target.value)} 
                                        className={inputClass} 
                                        placeholder="Contoh: 081234567890" 
                                    />
                                    {errors.telepon && <span className="text-red-500 text-xs">{errors.telepon}</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Perihal / Topik (Opsional)</label>
                                <input 
                                    type="text" 
                                    value={data.perihal} 
                                    onChange={e => setData('perihal', e.target.value)} 
                                    className={inputClass} 
                                    placeholder="Contoh: Pertanyaan Layanan Administrasi Kependudukan" 
                                />
                                {errors.perihal && <span className="text-red-500 text-xs">{errors.perihal}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Pesan / Saran *</label>
                                <textarea 
                                    rows="4" 
                                    value={data.pesan} 
                                    onChange={e => setData('pesan', e.target.value)} 
                                    className={inputClass} 
                                    placeholder="Tuliskan pesan atau saran Anda secara sopan..." 
                                    required
                                ></textarea>
                                {errors.pesan && <span className="text-red-500 text-xs">{errors.pesan}</span>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-sm"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Pesan'}
                            </button>
                        </form>
                    </div>

                    {/* DAFTAR ASPIRASI & BALASAN PUBLIK */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Daftar Aspirasi & Tanggapan Desa</h3>
                        <div className="space-y-6">
                            {pesanTerbaru && pesanTerbaru.length > 0 ? (
                                pesanTerbaru.map((item) => (
                                    <div key={item.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span className="font-bold text-gray-900 text-sm">{item.nama}</span>
                                            <span>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        {item.perihal && (
                                            <p className="text-xs font-semibold text-green-700 bg-green-50 inline-block px-2.5 py-1 rounded-md border border-green-200">
                                                Perihal: {item.perihal}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-700 leading-relaxed bg-white p-3.5 rounded-xl border border-gray-200">{item.pesan}</p>

                                        {/* Tanggapan / Balasan dari Admin Desa */}
                                        {item.balasan && (
                                            <div className="mt-3 ml-4 p-4 bg-green-50 border-l-4 border-green-600 rounded-r-xl text-sm text-green-900 shadow-sm">
                                                <p className="font-bold text-xs text-green-800 mb-1">🌿 Tanggapan Pemerintah Desa Gedangan:</p>
                                                <p className="text-gray-700 leading-relaxed">{item.balasan}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic text-center py-6">Belum ada pesan atau buku tamu yang dikirim.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}