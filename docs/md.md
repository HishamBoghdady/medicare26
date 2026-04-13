<!-- ممتاز. بعد المخطط، استخدمه كـ “خريطة” لكتابة pages.jsx بهذه الطريقة:

عرف الصفحات حسب الأدوار والصلاحيات.
اربط كل صفحة بـ ProtectedRoute.
خلي App.jsx يعرض فقط الـ Routes من pages.jsx.
مثال عملي:

// src/pages.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./guards/protectroute";

// صفحاتك الفعلية
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ManagerPage from "./pages/ManagerPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function AppPages() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute roles={["manager", "admin"]} permission="update">
            <ManagerPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
ثم في App.jsx:

import AppPages from "./pages";

function App() {
  return <AppPages />;
}

export default App;
نقطتان مهمتان قبل التشغيل:

في usePermission.js و protectroute.jsx الاستيراد الصحيح يكون من useAuth.js وليس AuthContext.
تأكد أن BrowserRouter موجود أعلى App (غالبًا في main.jsx).
إذا تريد، أقدر أكتب لك pages.jsx الآن مباشرةً على مشروعك مع هيكل صفحات جاهز (Admin/Manager/Client/Login/Unauthorized).

 -->
