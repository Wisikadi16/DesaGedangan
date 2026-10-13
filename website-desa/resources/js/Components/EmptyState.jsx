/** Tampilan saat data belum diisi (jujur, bukan teks karangan). */
export default function EmptyState({ children }) {
    return (
        <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 italic">{children}</p>
        </div>
    );
}
