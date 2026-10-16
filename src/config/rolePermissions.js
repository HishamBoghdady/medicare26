export const roleAccessMap = {
    admin: {
        /* Setting */
        createUser: true,
        manageUsers: true,
        viewAccount: true,
        MangeData: true,
        logout: true,
        /* Pages */
        newpatient: true,
        session: true,
        money: true,
        searsh: true,
        /* Feature */
        selectAll: true,
        editInfo: true,
        viewInfo: true,
        exit: true,
        del: true,
    },
    manager: {
        /* Setting */
        createUser: false,
        manageUsers: false,
        viewAccount: true,
        MangeData: false,
        logout: true,
        /* Pages */
        newpatient: true,
        session: true,
        money: true,
        searsh: true,
        /* Feature */
        selectAll: true,
        editInfo: true,
        viewInfo: true,
        exit: true,
        del: true,
    },
    client: {
        /* Setting */
        createUser: false,
        manageUsers: false,
        viewAccount: false,
        MangeData: false,
        logout: true,
        /* Pages */
        newpatient: false,
        session: false,
        money: false,
        searsh: true,
        /* Feature */
        selectAll: false,
        editInfo: false,
        viewInfo: true,
        exit: false,
        del: false,
    },
};
// الحصول على صلاحيات المستخدم
export const getRoleAccess = (role) => {
    const normalizedRole = role?.toLowerCase();

    return roleAccessMap[normalizedRole] ?? roleAccessMap.client;
};

// التحقق من صلاحية معينة
export const hasPermission = (role, permission) => {
    return getRoleAccess(role)[permission] === true;
};