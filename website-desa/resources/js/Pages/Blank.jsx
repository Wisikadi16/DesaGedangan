import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Blank({ title, profil }) {
    return (
        <PublicLayout profil={profil}>
            <Head title={title} />

            <div className="bg-gray-50 min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">{title}</h1>
                <p className="text-gray-500 text-lg mb-8">
                    Halaman ini masih dalam tahap pengembangan oleh Tim KKN UNNES GIAT 17.
                </p>
                <Link
                    href={route('home')}
                    className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
                >
                    &larr; Kembali ke Beranda
                </Link>
            </div>
        </PublicLayout>
    );
}