function unifyToDateString(value) {
    // إذا كان القيمة null أو undefined أو فارغة
    if (value == null || value === '') {
        return null;
    }

    // إذا كان الكائن من نوع Date بالفعل
    if (value instanceof Date && !isNaN(value)) {
        return value.toISOString().split('T')[0]; // YYYY-MM-DD
    }

    // إذا كان string
    if (typeof value === 'string') {
        const trimmed = value.trim();

        // إذا كان بالفعل بالصيغة YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            return trimmed;
        }

        // إذا كان يحتوي على وقت (مثل YYYY-MM-DDTHH:MM أو YYYY-MM-DDTHH:MM:SS)
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(trimmed)) {
            const date = new Date(trimmed);
            if (!isNaN(date)) {
                return date.toISOString().split('T')[0];
            }
        }

        // إذا كان يحتوي على مسافة بدل T (مثل YYYY-MM-DD HH:MM)
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(trimmed)) {
            const date = new Date(trimmed.replace(' ', 'T')); // تحويل المسافة إلى T لتسهيل التحليل
            if (!isNaN(date)) {
                return date.toISOString().split('T')[0];
            }
        }

        // محاولة تحليل التاريخ بأي صيغة أخرى يدعمها JavaScript
        const date = new Date(trimmed);
        if (!isNaN(date)) {
            return date.toISOString().split('T')[0];
        }
    }

    // إذا لم ينجح أي شيء
    throw new Error(`لا يمكن تحويل القيمة إلى تاريخ صالح: ${value}`);
}

// أمثلة على الاستخدام:
console.log(unifyToDateString('2026-01-06'));              // "2026-01-06"
console.log(unifyToDateString('2026-01-06T15:30'));        // "2026-01-06"
console.log(unifyToDateString('2026-01-06T15:30:45'));     // "2026-01-06"
console.log(unifyToDateString('2026-01-06 15:30'));        // "2026-01-06"
console.log(unifyToDateString(new Date('2026-01-06')));    // "2026-01-06"
console.log(unifyToDateString(null));                     // null