// utils/formatDate.js

/**
 * Format tanggal ke string readable (bisa handle Firestore Timestamp)
 * @param {Date|string|number|Object} date - Date, string, timestamp number, atau Firestore Timestamp
 * @param {Object} options
 * @param {string} options.locale - Default 'id-ID'
 * @param {Object} options.config - Intl.DateTimeFormat options
 * @returns {string}
 */
export function formatDate(date, options = {}) {
    if (!date) return "";

    const { locale = "id-ID", config = {} } = options;

    try {
        let d;

        // kalau Firestore Timestamp
        if (typeof date.toDate === "function") {
            d = date.toDate();
        } else {
            d = new Date(date);
        }

        if (isNaN(d.getTime())) return "";

        return new Intl.DateTimeFormat(locale, {
            day: "2-digit",
            month: "short",
            year: "numeric",
            ...config,
        }).format(d);
    } catch (err) {
        console.error("formatDate error:", err);
        return "";
    }
}
