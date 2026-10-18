import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/** Menu panel admin menggunakan URL murni agar aman dari error Ziggy */
const NAV = [
    { label: 'Dashboard', url: '/admin/dashboard', match: 'admin.dashboard' },
    { label: 'Berita', url: '/admin/berita', match: 'admin.berita.*' },
    { label: 'UMKM', url: '/admin/umkm', match: 'admin.umkm.*' },
    { label: 'Profil Desa', url: '/admin/profil', match: 'admin.profil.*' },
    { label: 'Pemerintahan', url: '/admin/pemerintahan', match: 'admin.pemerintahan.*' },
    { label: 'Dusun', url: '/admin/dusun', match: 'admin.dusun.*' },
    { label: 'Desa Wisata', url: '/admin/desa-wisata', match: 'admin.desa-wisata*' },
    { label: 'Syarat Pelayanan', url: '/admin/syarat-pelayanan', match: 'admin.syarat-pelayanan*' },
    { label: 'Layanan SMARD', url: '/admin/layanan-smard', match: 'admin.layanan-smard*' },
    { label: 'Potensi Desa', url: '/admin/potensi-desa', match: 'admin.potensi-desa*' },
    { label: 'Transparansi', url: '/admin/transparansi', match: 'admin.transparansi.*' },
    { label: 'Buku Tamu', url: '/admin/buku-tamu', match: 'admin.buku-tamu*' },
];

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const [showFlash, setShowFlash] = useState(false);
    useEffect(() => {
        if (flash?.message) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* H-16 diganti jadi min-h biar bisa turun ke bawah kalau menu kepanjangan */}
                    <div className="flex justify-between min-h-[4rem] py-2">
                        <div className="flex flex-1 items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* Spasi dan ukuran font diperkecil sedikit agar muat banyak menu */}
                            <div className="hidden space-x-2 lg:-my-px lg:ms-4 lg:flex lg:flex-wrap lg:items-center">
                                {NAV.map((item) => (
                                    <NavLink key={item.label} href={item.url} active={route().current(item.match)} className="text-xs lg:text-sm px-1 py-1">
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* Ditambah shrink-0 biar tombol dropdown admin gak kegeser menu */}
                        <div className="hidden lg:ms-4 lg:flex lg:items-center shrink-0">
                            <Link href="/" className="text-xs lg:text-sm text-gray-500 hover:text-green-700 me-3">
                                Lihat Website &rarr;
                            </Link>
                            <div className="relative ms-2">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                                aria-label="Buka menu"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' lg:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        {NAV.map((item) => (
                            <ResponsiveNavLink key={item.label} href={item.url} active={route().current(item.match)}>
                                {item.label}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href="/">Lihat Website</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Notifikasi sukses */}
            {showFlash && flash?.message && (
                <div
                    role="status"
                    className="fixed top-20 right-4 z-50 max-w-sm bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl flex items-start gap-3"
                >
                    <span>✓</span>
                    <span className="text-sm font-semibold">{flash.message}</span>
                    <button
                        type="button"
                        onClick={() => setShowFlash(false)}
                        className="ml-2 text-white/80 hover:text-white leading-none"
                        aria-label="Tutup"
                    >
                        ×
                    </button>
                </div>
            )}

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}