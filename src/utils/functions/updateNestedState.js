// دالة مساعدة لتحديث قيمة داخل كائن متداخل
export default function updateNestedState(hook, path, value) {
    hook(prev => {
        const newState = { ...prev };
        let current = newState;

        // نسير في المسار حتى آخر مفتاح
        for (let i = 0; i < path.length - 1; i++) {
            current[path[i]] = { ...current[path[i]] };
            current = current[path[i]];
        }

        // تحديث آخر مفتاح
        current[path[path.length - 1]] = value;

        return newState;
    });
};
