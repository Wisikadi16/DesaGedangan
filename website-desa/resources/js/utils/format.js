/** Pecah teks per baris menjadi daftar (dibuang tanda "-", "•", "1." di awal baris). */
export const toLines = (text) =>
    (text || '')
        .split('\n')
        .map((l) => l.replace(/^[\s\-•*\d.)]+/, '').trim())
        .filter(Boolean);

/** 1234567 -> "1.234.567" (format Indonesia). */
export const formatAngka = (n) => Number(n || 0).toLocaleString('id-ID');
