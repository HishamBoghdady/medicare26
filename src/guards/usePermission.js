// usePermission.js
import useAuth from "../context/auth/useAuth";
import { hasPermission } from "./permissions";
export function usePermission(permission) {
    const { user } = useAuth();

    if (!user?.role) return false;

    // return hasPermission(user.role, permission);
    return hasPermission(user, permission);
}
//useage
// const canDelete = usePermission("delete");

// {canDelete && <button>حذف</button>}
// | استخدم roles        | استخدم permission |
// | ------------------- | ----------------- |
// | صفحة خاصة بدور معين | ميزة معينة        |
// | Admin Panel         | زر حذف            |
// | لوحة تحكم المدير    | زر تعديل          |
//////////////////////////////////////////////////////////
// import useAuth from "../context/auth/useAuth";
// <Route
//   path="money"
//   element={
//     <ProtectedRoute permission="update">
//       <Money />
//     </ProtectedRoute>
//   }
// />
// <ProtectedRoute roles={["admin", "manager"]}>
//   <Reports />
// </ProtectedRoute>
// const canDelete = usePermission("delete");

// return (
//   <>
//     {canDelete && <Button color="error">Delete</Button>}
//   </>
// );

//////////////////////////////////////////////////////////