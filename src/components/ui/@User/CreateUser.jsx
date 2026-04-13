import { useState, useMemo } from "react";
import {
    Box,
    Paper,
    Grid,
    TextField,
    Typography,
    Button,
    MenuItem,
    Autocomplete,
    Chip,
    FormControlLabel,
    Checkbox,
} from "../../Lib/MuiComponents";
import { createUserByAdmin } from "../../../services/authServices";
import { ROLE_PERMISSIONS } from "../../../guards/permissions";

const ROLE_OPTIONS = ["admin", "manager", "client"];
const ALL_PERMISSIONS = ["create", "read", "update", "delete"];

export default function CreatePage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        role: "client",
        permissions: [],
        deniedPermissions: [],
        isActive: true,
        language: "ar",
        avatarUrl: "",
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const roleDefaultPerms = useMemo(
        () => ROLE_PERMISSIONS[form.role] || [],
        [form.role]
    );

    const effectivePreview = useMemo(() => {
        const allowed = new Set([...roleDefaultPerms, ...form.permissions]);
        form.deniedPermissions.forEach((p) => allowed.delete(p));
        return Array.from(allowed);
    }, [roleDefaultPerms, form.permissions, form.deniedPermissions]);

    const onChange = (key) => (e) => {
        const value = e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setForm((prev) => ({
            ...prev,
            role: newRole,
            permissions: [],
            deniedPermissions: [],
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setMsg("");

        if (!form.name || !form.email || !form.password) {
            setMsg("الاسم والبريد وكلمة المرور مطلوبة");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                ...form,
                permissions: Array.from(new Set(form.permissions)),
                deniedPermissions: Array.from(new Set(form.deniedPermissions)),
            };

            const created = await createUserByAdmin(payload);
            setMsg(`✅ تم إنشاء المستخدم: ${created.email}`);

            setForm({
                name: "",
                email: "",
                password: "",
                phone: "",
                department: "",
                role: "client",
                permissions: [],
                deniedPermissions: [],
                isActive: true,
                language: "ar",
                avatarUrl: "",
            });
        } catch (err) {
            setMsg(`❌ فشل الإنشاء: ${err?.message || err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 2, direction: "rtl" }} component="form" onSubmit={submit}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                    إنشاء مستخدم جديد
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="الاسم" value={form.name} onChange={onChange("name")} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth type="email" label="البريد" value={form.email} onChange={onChange("email")} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth type="password" label="كلمة المرور" value={form.password} onChange={onChange("password")} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="الهاتف" value={form.phone} onChange={onChange("phone")} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="القسم" value={form.department} onChange={onChange("department")} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField select fullWidth label="الدور" value={form.role} onChange={handleRoleChange}>
                            {ROLE_OPTIONS.map((r) => (
                                <MenuItem key={r} value={r}>
                                    {r}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            options={ALL_PERMISSIONS}
                            value={form.permissions}
                            onChange={(_, newValue) => setForm((prev) => ({ ...prev, permissions: newValue }))}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => <Chip label={option} {...getTagProps({ index })} key={option} />)
                            }
                            renderInput={(params) => <TextField {...params} label="صلاحيات إضافية (permissions)" />}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            options={ALL_PERMISSIONS}
                            value={form.deniedPermissions}
                            onChange={(_, newValue) => setForm((prev) => ({ ...prev, deniedPermissions: newValue }))}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => <Chip color="error" label={option} {...getTagProps({ index })} key={option} />)
                            }
                            renderInput={(params) => <TextField {...params} label="صلاحيات ممنوعة (deniedPermissions)" />}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="اللغة" value={form.language} onChange={onChange("language")} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="رابط الصورة (avatarUrl)" value={form.avatarUrl} onChange={onChange("avatarUrl")} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={form.isActive} onChange={onChange("isActive")} />}
                            label="مستخدم نشط"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            صلاحيات الدور الافتراضية: {roleDefaultPerms.join(", ") || "لا يوجد"}
                        </Typography>
                        <Typography variant="body2" color="primary">
                            الصلاحيات الفعلية المتوقعة: {effectivePreview.join(", ") || "لا يوجد"}
                        </Typography>
                    </Grid>

                    {!!msg && (
                        <Grid item xs={12}>
                            <Typography color={msg.startsWith("✅") ? "success.main" : "error.main"}>{msg}</Typography>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Button variant="contained" type="submit" disabled={loading}>
                            {loading ? "جاري الإنشاء..." : "إنشاء المستخدم"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
