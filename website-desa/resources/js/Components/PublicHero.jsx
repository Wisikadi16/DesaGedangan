/** Banner judul halaman publik (gaya sama dengan halaman Berita & UMKM). */
export default function PublicHero({ title, subtitle, image }) {
    return (
        <div
            className="bg-gradient-to-r from-green-800 to-teal-700 text-white text-center py-16 px-4 bg-cover bg-center"
            style={
                image
                    ? { backgroundImage: `linear-gradient(rgba(6,78,59,.8), rgba(6,78,59,.8)), url(/storage/${image})` }
                    : undefined
            }
        >
            <h2 className="text-4xl font-extrabold mb-3">{title}</h2>
            {subtitle && <p className="text-green-100 text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </div>
    );
}
