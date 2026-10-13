/** Kelas input seragam untuk semua form admin. */
export const inputClass =
    'w-full border-gray-300 rounded shadow-sm focus:ring-green-500 focus:border-green-500';

/** Label + isian + pesan error/petunjuk, dipakai di semua form admin. */
export default function Field({ label, error, hint, children }) {
    return (
        <div>
            <label className="block font-bold mb-1 text-gray-700">{label}</label>
            {children}
            {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}
