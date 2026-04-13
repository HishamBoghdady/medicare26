export default function CalcDate(entryTime, exitTime) {
    try {
        // نحول أي تاريخ إلى منتصف الليل المحلي لتجاهل الوقت
        const toSafeDate = (value) => {
            if (!value) return null;

            // input من نوع date (yyyy-mm-dd)
            if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                const [y, m, d] = value.split('-').map(Number);
                return new Date(y, m - 1, d, 0, 0, 0, 0); // 👈 نضبط على منتصف الليل المحلي
            }

            // input من نوع datetime-local
            if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
                const [y, m, d] = value.split('T')[0].split('-').map(Number);
                return new Date(y, m - 1, d, 0, 0, 0, 0);
            }

            // أي قيمة أخرى نحاول تحويلها لتاريخ عادي
            const date = new Date(value);
            if (isNaN(date)) return null;
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        };

        // نحصل على التاريخ المحلي الحالي فقط (بدون UTC)
        const now = new Date();
        const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

        // نهيئ تواريخ الدخول والخروج
        const entryDate = toSafeDate(entryTime);
        const exitDate = exitTime ? toSafeDate(exitTime) : todayLocal;

        if (!entryDate || !exitDate) return 0;

        // نحسب الفرق بالأيام (باستخدام القيمة المحلية)
        const diffTime = exitDate.getTime() - entryDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // لا نسمح بنتيجة سالبة
        return diffDays > 0 ? diffDays : 0;
    } catch {
        return 0;
    }
}
