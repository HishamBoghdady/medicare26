import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "../../Lib/MuiComponents";
import useAuth from "../../../context/auth/useAuth";
import {
  getUserProfile,
  updateUserProfile,
  changeMyPassword,
} from "../../../services/authServices";

export default function MyAccount() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    language: "ar",
    avatarUrl: "",
  });

  const [pass, setPass] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!user?.uid) return;
      const data = await getUserProfile(user.uid);
      if (!data) return;

      setProfile({
        name: data.name || "",
        email: data.email || user.email || "",
        phone: data.phone || "",
        department: data.department || "",
        language: data.language || "ar",
        avatarUrl: data.avatarUrl || "",
      });
    };

    load();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user?.uid) return;
    try {
      setLoading(true);
      setMsg("");

      await updateUserProfile(user.uid, {
        name: profile.name,
        phone: profile.phone,
        department: profile.department,
        language: profile.language,
        avatarUrl: profile.avatarUrl,
        updatedAt: new Date(),
      });

      setMsg("✅ تم تحديث البيانات بنجاح");
    } catch (err) {
      setMsg(`❌ فشل تحديث البيانات: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (pass.newPassword.length < 6) {
      setMsg("❌ كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (pass.newPassword !== pass.confirmPassword) {
      setMsg("❌ تأكيد كلمة المرور غير مطابق");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      await changeMyPassword(pass.currentPassword, pass.newPassword);

      setPass({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setMsg("✅ تم تغيير كلمة المرور بنجاح");
    } catch (err) {
      setMsg(`❌ فشل تغيير كلمة المرور: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, direction: "rtl" }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          حسابي
        </Typography>

        {!!msg && (
          <Typography sx={{ mb: 2 }} color={msg.startsWith("✅") ? "success.main" : "error.main"}>
            {msg}
          </Typography>
        )}

        <Typography variant="h6" sx={{ mb: 2 }}>البيانات الشخصية</Typography>
        <Stack spacing={2}>
          <TextField label="الاسم" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
          <TextField label="البريد الإلكتروني" value={profile.email} disabled />
          <TextField label="الهاتف" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
          <TextField label="القسم" value={profile.department} onChange={(e) => setProfile((p) => ({ ...p, department: e.target.value }))} />
          <TextField label="اللغة" value={profile.language} onChange={(e) => setProfile((p) => ({ ...p, language: e.target.value }))} />
          <TextField label="Avatar URL" value={profile.avatarUrl} onChange={(e) => setProfile((p) => ({ ...p, avatarUrl: e.target.value }))} />

          <Button variant="contained" onClick={handleSaveProfile} disabled={loading}>
            حفظ البيانات
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>تغيير كلمة المرور</Typography>
        <Stack spacing={2}>
          <TextField
            label="كلمة المرور الحالية"
            type="password"
            value={pass.currentPassword}
            onChange={(e) => setPass((p) => ({ ...p, currentPassword: e.target.value }))}
          />
          <TextField
            label="كلمة المرور الجديدة"
            type="password"
            value={pass.newPassword}
            onChange={(e) => setPass((p) => ({ ...p, newPassword: e.target.value }))}
          />
          <TextField
            label="تأكيد كلمة المرور الجديدة"
            type="password"
            value={pass.confirmPassword}
            onChange={(e) => setPass((p) => ({ ...p, confirmPassword: e.target.value }))}
          />

          <Button variant="contained" color="warning" onClick={handleChangePassword} disabled={loading}>
            تغيير كلمة المرور
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
