import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Manajemen UMKM</h2>}>
            <Head title="Kelola UMKM" />
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-orange-500">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Daftar UMKM Warga</h3>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded font-bold">+ Tambah Data</button>
                    </div>
                    <p className="text-gray-500 italic">Modul tabel UMKM sedang disiapkan...</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}