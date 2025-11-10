// utils/formatCurrency.js

/**
 * Format angka ke bentuk currency
 * @param {number|string} value - Angka yang akan diformat
 * @param {Object} options
 * @param {string} options.locale - Default "id-ID"
 * @param {string} options.currency - Default "IDR"
 * @returns {string}
 */
export function formatCurrency(value, options = {}) {
    if (value == null || value === "") return "";

    const { locale = "id-ID", currency = "IDR" } = options;

    try {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(value));
    } catch (err) {
        console.error("formatCurrency error:", err);
        return value;
    }
}
