import { Head, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { inputClass } from '@/Components/FormField';
import { useState } from 'react';

export default function BukuTamu({ auth, profil, pesanTerbaru }) {
    const { flash } = usePage().props;
    const [setuju, setSetuju] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        nama: '',
        telepon: '',
        perihal: 'Informasi Umum',
        pesan: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!setuju) {
            alert('Harap centang kotak persetujuan terlebih dahulu.');
            return;
        }
        post(route('buku-tamu.store'), {
            onSuccess: () => {
                reset();
                setSetuju(false);
            },
        });
    };

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title="Hubungi Kami & Buku Tamu" />

            <div className="bg-gray-50 text-gray-800 font-sans py-12 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    
                    {/* Judul Halaman */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Hubungi Kami</h1>
                    </div>

                    {/* Notifikasi Sukses */}
                    {flash.message && (
                        <div className="bg-green-600 text-white p-4 rounded-xl shadow-sm font-medium text-center">
                            {flash.message}
                        </div>
                    )}

                    {/* Layout 2 Kolom (Kiri: Info Kantor, Kanan: Form Pengaduan) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* KOLOM KIRI: Informasi Kantor */}
                        <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Informasi Kantor</h2>
                            
                            <div className="space-y-4 text-sm text-gray-700">
                                <div>
                                    <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                                        <span>📍</span> Kantor Desa Gedangan
                                    </p>
                                    <p className="text-gray-600 leading-relaxed pl-6">
                                        {profil?.alamat || 'Jl. Salatiga – Banyubiru Desa Gedangan Kec. Tuntang Kab. Semarang Jawa Tengah 50773'}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                                        <span>📞</span>
                                    </p>
                                    <a href={`tel:${profil?.telepon || '02986031115'}`} className="text-green-700 hover:underline pl-6 block">
                                        {profil?.telepon || '(0298) 6031115'}
                                    </a>
                                </div>

                                <div>
                                    <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                                        <span>✉️</span>
                                    </p>
                                    <a href={`mailto:${profil?.email || 'pemerintahdesagedangan@gmail.com'}`} className="text-green-700 hover:underline pl-6 block">
                                        {profil?.email || 'pemerintahdesagedangan@gmail.com'}
                                    </a>
                                </div>

                                <div className="pt-2 border-t border-gray-100">
                                    <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span>🕒</span> Senin – Kamis
                                    </p>
                                    <p className="text-gray-600 pl-6">07.30 – 15.00</p>
                                </div>

                                <div>
                                    <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span>🕒</span> Jumat
                                    </p>
                                    <p className="text-gray-600 pl-6">07.00 – 14.00</p>
                                </div>
                            </div>
                        </div>

                        {/* KOLOM KANAN: Pengaduan Masyarakat (Form) */}
                        <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pengaduan Masyarakat</h2>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Nama Lengkap</label>
                                    <input 
                                        type="text" 
                                        value={data.nama} 
                                        onChange={e => setData('nama', e.target.value)} 
                                        className={inputClass} 
                                        required 
                                    />
                                    {errors.nama && <span className="text-red-500 text-xs mt-1 block">{errors.nama}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Nomor HP</label>
                                    <input 
                                        type="text" 
                                        value={data.telepon} 
                                        onChange={e => setData('telepon', e.target.value)} 
                                        className={inputClass} 
                                        placeholder="Contoh: 081234567890" 
                                    />
                                    {errors.telepon && <span className="text-red-500 text-xs mt-1 block">{errors.telepon}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Perihal</label>
                                    <select 
                                        value={data.perihal} 
                                        onChange={e => setData('perihal', e.target.value)} 
                                        className={inputClass}
                                    >
                                        <option value="Informasi Umum">Informasi Umum</option>
                                        <option value="Layanan Administrasi Kependudukan">Layanan Administrasi Kependudukan</option>
                                        <option value="Pengaduan / Aspirasi">Pengaduan / Aspirasi</option>
                                        <option value="Infrastruktur & Pembangunan">Infrastruktur & Pembangunan</option>
                                    </select>
                                    {errors.perihal && <span className="text-red-500 text-xs mt-1 block">{errors.perihal}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Pesan</label>
                                    <textarea 
                                        rows="5" 
                                        value={data.pesan} 
                                        onChange={e => setData('pesan', e.target.value)} 
                                        className={inputClass} 
                                        required
                                    ></textarea>
                                    {errors.pesan && <span className="text-red-500 text-xs mt-1 block">{errors.pesan}</span>}
                                </div>

                                <div className="flex items-start gap-3 pt-2">
                                    <input 
                                        type="checkbox" 
                                        id="persetujuan"
                                        checked={setuju}
                                        onChange={(e) => setSetuju(e.target.checked)}
                                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="persetujuan" className="text-sm text-gray-600 select-none cursor-pointer">
                                        Saya menyetujui data ini digunakan untuk menanggapi pesan saya.
                                    </label>
                                </div>

                                <div className="pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={processing || !setuju} 
                                        className={`px-6 py-2.5 rounded-lg font-semibold text-white transition shadow-sm ${
                                            setuju ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* DAFTAR ASPIRASI & TANGGAPAN DESA (Publik) */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Daftar Aspirasi & Tanggapan Desa</h3>
                        <div className="space-y-6">
                            {pesanTerbaru && pesanTerbaru.length > 0 ? (
                                pesanTerbaru.map((item) => (
                                    <div key={item.id} className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span className="font-bold text-gray-900 text-sm">{item.nama}</span>
                                            <span>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        {item.perihal && (
                                            <p className="text-xs font-semibold text-blue-700 bg-blue-50 inline-block px-2.5 py-1 rounded-md border border-blue-200">
                                                Perihal: {item.perihal}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-700 leading-relaxed bg-white p-3.5 rounded-lg border border-gray-200">{item.pesan}</p>

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