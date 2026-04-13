function normalizeDate(input) {
    if (!input) return null;

    let date;

    // إذا كان Date object بالفعل
    if (input instanceof Date && !isNaN(input)) {
        date = input;
    }
    // إذا كان string
    else if (typeof input === 'string') {
        const trimmed = input.trim();

        // إذا كان بالفعل YYYY-MM-DD → نرجعه كما هو
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            return trimmed;
        }

        // تحويل صيغ شائعة تحتوي على وقت
        const isoLike = trimmed.replace(' ', 'T'); // YYYY-MM-DD HH:MM → YYYY-MM-DDTHH:MM
        date = new Date(isoLike);
    }
    // إذا كان timestamp (رقم)
    else if (typeof input === 'number') {
        date = new Date(input);
    }
    else {
        return null;
    }

    // التأكد من أن التاريخ صالح
    if (isNaN(date)) return null;

    // إرجاع التاريخ كـ YYYY-MM-DD
    return date.toISOString().split('T')[0];
}

// أمثلة:
console.log(normalizeDate('2026-01-06'));          // "2026-01-06"
console.log(normalizeDate('2026-01-06T15:30'));    // "2026-01-06"
console.log(normalizeDate('2026-01-06 15:30:45')); // "2026-01-06"
console.log(normalizeDate(new Date()));           // تاريخ اليوم بصيغة YYYY-MM-DD
console.log(normalizeDate(1640995200000));        // "2022-01-01"
console.log(normalizeDate('غير صالح'));           // null