import { Head, Link } from '@inertiajs/react';

export default function Blank({ title }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
            <Head title={title} />
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
    );
}