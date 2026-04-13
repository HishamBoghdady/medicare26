import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Autocomplete,
  MenuItem,
} from "../../Lib/MuiComponents";
import { TableCell } from "@mui/material";

import {
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
  adminSendPasswordReset,
} from "../../../services/authServices";

import { ROLE_PERMISSIONS } from "../../../guards/permissions";

const ROLE_OPTIONS = ["admin", "manager", "client"];
const ALL_PERMISSIONS = ["create", "read", "update", "delete"];

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // NEW: loading per-user reset action
  const [resetTargetId, setResetTargetId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "client",
    permissions: [],
    deniedPermissions: [],
    isActive: true,
    language: "ar",
    avatarUrl: "",
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      setMsg("");
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setMsg(`❌ فشل تحميل المستخدمين: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const roleDefaultPerms = useMemo(
    () => ROLE_PERMISSIONS[form.role] || [],
    [form.role]
  );

  const effectivePreview = useMemo(() => {
    const allowed = new Set([...(ROLE_PERMISSIONS[form.role] || []), ...(form.permissions || [])]);
    (form.deniedPermissions || []).forEach((p) => allowed.delete(p));
    return Array.from(allowed);
  }, [form.role, form.permissions, form.deniedPermissions]);

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      department: user?.department || "",
      role: user?.role || "client",
      permissions: user?.permissions || [],
      deniedPermissions: user?.deniedPermissions || [],
      isActive: user?.isActive ?? true,
      language: user?.language || "ar",
      avatarUrl: user?.avatarUrl || "",
    });
    setEditOpen(true);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const saveEdit = async () => {
    if (!selectedUser?.uid) {
      setMsg("❌ uid غير موجود للمستخدم المحدد");
      return;
    }
    try {
      await updateUserProfile(selectedUser.uid, {
        name: form.name,
        phone: form.phone,
        department: form.department,
        role: form.role,
        permissions: Array.from(new Set(form.permissions)),
        deniedPermissions: Array.from(new Set(form.deniedPermissions)),
        isActive: form.isActive,
        language: form.language,
        avatarUrl: form.avatarUrl,
        updatedAt: new Date(),
      });

      setMsg("✅ تم تحديث المستخدم بنجاح");
      setEditOpen(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (err) {
      console.error("update error:", err);
      setMsg(`❌ فشل التحديث: ${err?.code || ""} ${err?.message || err}`);
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser?.uid) return;
    try {
      await deleteUserProfile(selectedUser.uid);
      setMsg("✅ تم حذف المستخدم من قاعدة البيانات");
      setDeleteOpen(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (err) {
      setMsg(`❌ فشل الحذف: ${err?.message || err}`);
    }
  };

  // NEW: reset by row only
  const handleResetPassword = async (user) => {
    try {
      if (!user?.uid || !user?.email) {
        setMsg("❌ بيانات المستخدم غير مكتملة");
        return;
      }

      setResetTargetId(user.uid);
      await adminSendPasswordReset(user.email);
      setMsg(`✅ تم إرسال رابط إعادة تعيين كلمة المرور إلى ${user.email}`);
    } catch (err) {
      setMsg(`❌ فشل إرسال رابط إعادة التعيين: ${err?.message || err}`);
    } finally {
      setResetTargetId(null);
    }
  };

  return (
    <Box sx={{ p: 2, direction: "rtl" }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        ملاحظة: deleteUserProfile يحذف من Firestore فقط، وليس من Firebase Authentication.
      </Typography>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid #d6d6d6", mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0d47a1" }}>
            إدارة المستخدمين
          </Typography>
          <Button variant="contained" onClick={loadUsers}>
            تحديث
          </Button>
        </Stack>

        {!!msg && (
          <Typography sx={{ mb: 2 }} color={msg.startsWith("✅") ? "success.main" : "error.main"}>
            {msg}
          </Typography>
        )}

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>الاسم</TableCell>
                <TableCell>البريد</TableCell>
                <TableCell>الدور</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell>الصلاحيات</TableCell>
                <TableCell>إجراءات</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>لا يوجد مستخدمين</TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow key={u.uid} hover>
                    <TableCell>{u.name || "-"}</TableCell>
                    <TableCell>{u.email || "-"}</TableCell>
                    <TableCell>{u.role || "client"}</TableCell>
                    <TableCell>{u.isActive === false ? "غير نشط" : "نشط"}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {(u.permissions || []).map((p) => (
                          <Chip key={`${u.uid}-${p}`} label={p} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Button size="small" variant="outlined" onClick={() => openEditDialog(u)}>
                          تعديل
                        </Button>

                        <Button size="small" color="error" variant="contained" onClick={() => openDeleteDialog(u)}>
                          حذف
                        </Button>

                        <Button
                          size="small"
                          color="warning"
                          variant="contained"
                          disabled={resetTargetId === u.uid}
                          onClick={() => handleResetPassword(u)}
                        >
                          {resetTargetId === u.uid ? "جاري الإرسال..." : "Reset Password"}
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>تعديل المستخدم</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
            <TextField label="الاسم" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            <TextField label="البريد" value={form.email} disabled />
            <TextField label="الهاتف" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
            <TextField label="القسم" value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))} />
            <TextField select label="الدور" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
              {ROLE_OPTIONS.map((r) => (
                <MenuItem key={r} value={r}>{r}</MenuItem>
              ))}
            </TextField>
            <TextField label="اللغة" value={form.language} onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))} />
            <TextField label="Avatar URL" value={form.avatarUrl} onChange={(e) => setForm((p) => ({ ...p, avatarUrl: e.target.value }))} />
            <TextField
              select
              label="الحالة"
              value={form.isActive ? "active" : "inactive"}
              onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.value === "active" }))}
            >
              <MenuItem value="active">نشط</MenuItem>
              <MenuItem value="inactive">غير نشط</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Autocomplete
              multiple
              options={ALL_PERMISSIONS}
              value={form.permissions}
              onChange={(_, v) => setForm((p) => ({ ...p, permissions: v }))}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <Chip label={option} {...getTagProps({ index })} key={option} />)
              }
              renderInput={(params) => <TextField {...params} label="permissions (إضافية)" />}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Autocomplete
              multiple
              options={ALL_PERMISSIONS}
              value={form.deniedPermissions}
              onChange={(_, v) => setForm((p) => ({ ...p, deniedPermissions: v }))}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip color="error" label={option} {...getTagProps({ index })} key={option} />
                ))
              }
              renderInput={(params) => <TextField {...params} label="deniedPermissions (منع)" />}
            />
          </Box>

          <Typography sx={{ mt: 2 }} variant="body2">
            صلاحيات الدور الافتراضية: {roleDefaultPerms.join(", ") || "لا يوجد"}
          </Typography>
          <Typography variant="body2" color="primary">
            الصلاحيات الفعلية بعد الدمج: {effectivePreview.join(", ") || "لا يوجد"}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={saveEdit}>حفظ</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>
            هل تريد حذف المستخدم: {selectedUser?.name || selectedUser?.email} ؟
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>إلغاء</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>حذف</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
