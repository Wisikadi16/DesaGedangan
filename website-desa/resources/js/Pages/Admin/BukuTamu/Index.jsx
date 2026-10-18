import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ pesanList }) {
    const [activeReplyId, setActiveReplyId] = useState(null);
    const { data, setData, put, processing, reset } = useForm({
        balasan: ''
    });

    const handleReply = (id, currentBalasan) => {
        setActiveReplyId(id);
        setData('balasan', currentBalasan || '');
    };

    const submitReply = (e, id) => {
        e.preventDefault();
        put(route('admin.buku-tamu.update', id), {
            onSuccess: () => {
                setActiveReplyId(null);
                reset();
            }
        });
    };

    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus pesan ini?')) {
            router.delete(route('admin.buku-tamu.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Kelola Buku Tamu & Aspirasi</h2>}>
            <Head title="Admin Buku Tamu" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-green-500">
                        <h3 className="text-lg font-bold text-gray-700 mb-6">Daftar Masukan & Pesan Warga</h3>

                        <div className="space-y-6">
                            {pesanList.data.length > 0 ? (
                                pesanList.data.map((item) => (
                                    <div key={item.id} className="p-4 border rounded-xl bg-gray-50 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="font-bold text-gray-800">{item.nama}</span>
                                                <span className="text-xs text-gray-500 ml-2">({item.telepon || 'Tanpa No HP'})</span>
                                                <div className="text-xs text-green-700 font-semibold mt-0.5">Perihal: {item.perihal || 'Umum'}</div>
                                            </div>
                                            <span className="text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>

                                        <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border">{item.pesan}</p>

                                        {/* Tampilan Balasan Admin jika sudah ada */}
                                        {item.balasan && (
                                            <div className="ml-6 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-900">
                                                <p className="font-bold text-xs text-green-800 mb-1">💬 Balasan Pemerintah Desa:</p>
                                                <p>{item.balasan}</p>
                                            </div>
                                        )}

                                        {/* Form Input Balasan */}
                                        {activeReplyId === item.id ? (
                                            <form onSubmit={(e) => submitReply(e, item.id)} className="space-y-2 pt-2">
                                                <textarea 
                                                    rows="2" 
                                                    value={data.balasan} 
                                                    onChange={e => setData('balasan', e.target.value)} 
                                                    className="w-full text-sm border-gray-300 rounded-lg shadow-sm"
                                                    placeholder="Tulis balasan resmi dari desa..."
                                                    required
                                                ></textarea>
                                                <div className="flex gap-2">
                                                    <button type="submit" disabled={processing} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700">
                                                        Kirim Balasan
                                                    </button>
                                                    <button type="button" onClick={() => setActiveReplyId(null)} className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold">
                                                        Batal
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="flex gap-2 pt-1">
                                                <button onClick={() => handleReply(item.id, item.balasan)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">
                                                    {item.balasan ? 'Edit Balasan' : 'Balas Pesan'}
                                                </button>
                                                <button onClick={() => hapus(item.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600">
                                                    Hapus
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 italic py-6">Belum ada pesan masuk.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}