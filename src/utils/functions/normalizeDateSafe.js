/**
 * normalizeDateSafe
 * -----------------
 * توحيد أي قيمة تاريخ إلى YYYY-MM-DD
 * - لا ترمي Errors
 * - تتجنب مشاكل Timezone
 * - تدعم Date / string / timestamp
 * - تُرجع null عند الفشل
 */
export default function normalizeDateSafe(value) {
    if (value == null || value === '') return null;

    let date = null;

    // 1️⃣ Date object
    if (value instanceof Date && !isNaN(value)) {
        date = value;
    }

    // 2️⃣ Timestamp (seconds أو milliseconds)
    else if (typeof value === 'number') {
        if (value < 1e12) {
            // seconds → milliseconds
            date = new Date(value * 1000);
        } else {
            date = new Date(value);
        }
    }

    // 3️⃣ String
    else if (typeof value === 'string') {
        const trimmed = value.trim();

        // YYYY-MM-DD (آمنة 100%)
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            return trimmed;
        }

        // ISO مع وقت (T أو space)
        if (
            /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}/.test(trimmed)
        ) {
            date = new Date(trimmed.replace(' ', 'T'));
        } else {
            // محاولة أخيرة
            date = new Date(trimmed);
        }
    }

    // غير مدعوم
    else {
        return null;
    }

    // تحقق نهائي
    if (!date || isNaN(date)) return null;

    // 🔒 إرجاع التاريخ المحلي بدون UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
