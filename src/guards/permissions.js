//permissions.js
export const ROLE_PERMISSIONS = {
    admin: ["create", "read", "update", "delete"],
    manager: ["read", "update"],
    client: ["read"]
};

export const getPermissionsByRole = (role) => {
    return ROLE_PERMISSIONS[role] || [];
};

// export const hasPermission = (role, permission) => {
//     return getPermissionsByRole(role).includes(permission);
// };

/////////////////////
/**
 * يدعم:
 * - role permissions
 * - user.permissions (إضافات فردية)
 * - user.deniedPermissions (منع فردي)
 */
export const hasPermission = (userOrRole, permission) => {
    if (!permission) return true;

    // دعم الاستدعاء القديم: hasPermission("admin", "update")
    if (typeof userOrRole === "string") {
        return getPermissionsByRole(userOrRole).includes(permission);
    }

    const user = userOrRole || {};
    const rolePerms = getPermissionsByRole(user.role);
    const extraPerms = Array.isArray(user.permissions) ? user.permissions : [];
    const deniedPerms = Array.isArray(user.deniedPermissions) ? user.deniedPermissions : [];

    const allowed = new Set([...rolePerms, ...extraPerms]);
    deniedPerms.forEach((p) => allowed.delete(p));

    return allowed.has(permission);
};
