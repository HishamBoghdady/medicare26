// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import  useAuth  from "../context/auth/useAuth";
import { hasPermission } from "./permissions";

function ProtectedRoute({ roles, permission, children }) {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // if (permission && !hasPermission(user.role, permission)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }
  if (permission && !hasPermission(user, permission)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}

export default ProtectedRoute;

// لآن يمكنك استخدامه بعدة طرق
// حماية بدور فقط
// <ProtectedRoute roles={["admin"]}>
//   <AdminPage />
// </ProtectedRoute>

// حماية بصلاحية فقط
// <ProtectedRoute permission="delete">
//   <DeletePage />
// </ProtectedRoute>

// حماية بالدور والصلاحية معًا
// <ProtectedRoute roles={["manager"]} permission="update">
//   <EditPage />
// </ProtectedRoute>