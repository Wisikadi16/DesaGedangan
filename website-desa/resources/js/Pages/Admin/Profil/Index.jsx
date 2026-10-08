import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold text-gray-800">Manajemen Profil Desa</h2>}>
            <Head title="Kelola Profil" />
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 shadow-sm sm:rounded-lg border-t-4 border-purple-500">
                    <h3 className="text-lg font-bold mb-4">Update Data Desa & Aparatur</h3>
                    <p className="text-gray-500 italic">Formulir profil desa sedang disiapkan...</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}