import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { renderFormattedText } from '@/utils/textParser';

export default function DesaWisata({ profil, auth, desaWisata }) {
    const namaDesa = profil?.nama_desa || 'Desa Gedangan';
    const [activeTab, setActiveTab] = useState('VISI DAN MISI');
    
    const tabs = [
        'VISI DAN MISI', 'SARANA', 'OBYEK WISATA', 
        'KULINER NDESO', 'EVEN', 'INFO PAKET', 'POKDARWIS'
    ];

    // Fungsi untuk mengambil isi tab sesuai yang diklik
    const getTabContent = () => {
        if (!desaWisata) return null;
        
        switch (activeTab) {
            case 'VISI DAN MISI': return desaWisata.visi_misi;
            case 'SARANA': return desaWisata.sarana;
            case 'OBYEK WISATA': return desaWisata.obyek_wisata;
            case 'KULINER NDESO': return desaWisata.kuliner_ndeso;
            case 'EVEN': return desaWisata.even;
            case 'INFO PAKET': return desaWisata.info_paket;
            case 'POKDARWIS': return desaWisata.pokdarwis;
            default: return null;
        }
    };

    const currentContent = getTabContent();

    return (
        <PublicLayout profil={profil} auth={auth}>
            <Head title={`Desa Wisata Kali Odo - ${namaDesa}`} />
            
            <div className="bg-gray-50 text-gray-800 font-sans pb-20">
                {/* HERO SECTION */}
                <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-teal-800 text-white text-center py-24 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative max-w-4xl mx-auto space-y-4">
                        <span className="bg-green-700/60 text-green-200 border border-green-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block backdrop-blur-sm">
                            Pesona Alam & Budaya
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Desa Wisata Sumber Mas "Kali Odo"</h1>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10 space-y-12">
                    
                    {/* ARTIKEL / PROFIL DESA WISATA (DARI DATABASE) */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 text-gray-700 leading-relaxed text-base md:text-lg">
                        {desaWisata?.narasi_utama ? renderFormattedText(desaWisata.narasi_utama) : (
                            <p className="text-center italic text-gray-400">Narasi utama belum diisi oleh admin.</p>
                        )}
                    </div>

                    {/* INTERACTIVE TABS */}
                    <div className="space-y-6">
                        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap gap-2 justify-center lg:justify-start">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 ${
                                        activeTab === tab
                                            ? 'bg-green-700 text-white shadow-md transform scale-105'
                                            : 'bg-transparent text-gray-500 hover:bg-green-50 hover:text-green-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* KONTEN TAB (DARI DATABASE) */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[300px]">
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4 inline-block border-b-green-500">
                                {activeTab}
                            </h3>
                            <div className="text-gray-700 leading-relaxed text-lg">
                                {currentContent ? renderFormattedText(currentContent) : (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        <span className="text-5xl">🚧</span>
                                        <p className="text-center font-medium text-gray-500">
                                            Data untuk <span className="font-bold text-green-700">{activeTab}</span> belum diisi oleh admin.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}