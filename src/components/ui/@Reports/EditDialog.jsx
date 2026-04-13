//Import Hooks
import { useState, useEffect } from "react";
//Import MUI
import {Box,Grid,Stack,Dialog,Button,Divider,TextField,Typography,DialogContent} from "../../Lib/MuiComponents"
//Import Context
import usePatient from "../../../context/Patient/usePatient";
import {normalizeDateSafe} from '../../../utils/index';
export default function EditDialog({ open, onClose, rowData }) {
    const { updatePatient } = usePatient();

    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        if (rowData?.FullData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedPatient(rowData.FullData);
        }
    }, [rowData]);
    //update information in Filds
    const updatePersonalData = (key, value) => {
        setSelectedPatient(prev => ({
            ...prev,
            PersonalData: {
                ...prev.PersonalData,
                [key]: value,
            },
        }));
    };
    const updateAdmissionApplicant = (key, value) => {
        setSelectedPatient(prev => ({
            ...prev,
            AdmissionApplicant: {
                ...prev.AdmissionApplicant,
                [key]: value,
            },
        }));
    };
    const updateEnteryData = (key, value) => {
        setSelectedPatient(prev => ({
            ...prev,
            EnteryData: {
                ...prev.EnteryData,
                [key]: value,
            },
        }));
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" dir="rtl" >
            <DialogContent sx={{ p: 4, fontFamily: "Arial" }}>

                {/* ===== عنوان الاستمارة ===== */}
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                        استمارة تسجيل مريض
                    </Typography>
                    <Typography variant="body2">
                        نموذج تسجيل بيانات رسمية
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                </Box>

                {/* ================= 1️⃣ البيانات الشخصية ================= */}
                <Box sx={{ mt: 4 }}>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                        أولًا: البيانات الشخصية
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField label="الاسم بالكامل" variant="standard" value={selectedPatient?.PersonalData?.Name || ""}
                                onChange={(e) => updatePersonalData("Name", e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="الرقم القومي" variant="standard" value={selectedPatient?.PersonalData?.ID || ""}
                                onChange={(e) => updatePersonalData("ID", e.target.value)} type="number" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="العنوان" variant="standard" value={selectedPatient?.PersonalData?.Address || ""}
                                onChange={(e) => updatePersonalData("Address", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField label="النوع" variant="standard" value={selectedPatient?.PersonalData?.Gender || ""}
                                onChange={(e) => updatePersonalData("Gender", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField label="السن" variant="standard" value={selectedPatient?.PersonalData?.Age || ""}
                                onChange={(e) => updatePersonalData("Age", e.target.value)} type="number" />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField label="الوظيفة" variant="standard" value={selectedPatient?.PersonalData?.Work || ""}
                                onChange={(e) => updatePersonalData("Work", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField label="الجنسية" variant="standard" value={selectedPatient?.PersonalData?.Nationnality || ""}
                                onChange={(e) => updatePersonalData("Nationnality", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField label="الديانة" variant="standard" value={selectedPatient?.PersonalData?.Religion || ""}
                                onChange={(e) => updatePersonalData("Religion", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField label="الحالة الاجتماعية" variant="standard" value={selectedPatient?.PersonalData?.SocialStatus || ""}
                                onChange={(e) => updatePersonalData("SocialStatus", e.target.value)} />
                        </Grid>
                    </Grid>
                </Box>


                {/* ================= 2️⃣ صاحب الدخول ================= */}
                <Box sx={{ mt: 4 }}>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                        ثانيًا: بيانات صاحب الدخول
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField label="الاسم بالكامل" variant="standard" value={selectedPatient?.AdmissionApplicant?.Name || ""}
                                onChange={(e) => updateAdmissionApplicant("Name", e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="العنوان" variant="standard" value={selectedPatient?.AdmissionApplicant?.Address || ""}
                                onChange={(e) => updateAdmissionApplicant("Address", e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="الرقم القومي" variant="standard" value={selectedPatient?.AdmissionApplicant?.ID || ""}
                                onChange={(e) => updateAdmissionApplicant("ID", e.target.value)} type="number" />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="العمل" variant="standard" value={selectedPatient?.AdmissionApplicant?.Work || ""}
                                onChange={(e) => updateAdmissionApplicant("Work", e.target.value)}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="صفه" variant="standard" value={selectedPatient?.AdmissionApplicant?.Kinship || ""}
                                onChange={(e) => updateAdmissionApplicant("Kinship", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="الجنسيه" variant="standard" value={selectedPatient?.AdmissionApplicant?.Nationnality || ""}
                                onChange={(e) => updateAdmissionApplicant("Nationnality", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="رقم الهاتف" variant="standard" value={selectedPatient?.AdmissionApplicant?.PhoneNumber || ""}
                                onChange={(e) => updateAdmissionApplicant("PhoneNumber", e.target.value)} type="number" />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="اقرار الجلسات" variant="standard" value={selectedPatient?.AdmissionApplicant?.ApprovalSession || ""}
                                onChange={(e) => updateAdmissionApplicant("ApprovalSession", e.target.value)} />
                        </Grid>
                    </Grid>
                </Box>

                {/* ================= 3️⃣ بيانات الدخول ================= */}
                <Box sx={{ mt: 4 }}>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                        ثالثًا: بيانات الدخول
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <TextField label="مادة الدخول" variant="standard" value={selectedPatient?.EnteryData?.EntryMaterial || ""}
                                onChange={(e) => updateEnteryData("EntryMaterial", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField type="date" variant="standard" label="تاريخ الدخول" value={normalizeDateSafe(selectedPatient?.EnteryData?.EntryTime) || ""}
                                onChange={(e) => updateEnteryData("EntryTime", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="نوع المرض" variant="standard" value={selectedPatient?.EnteryData?.TypeDiseas || ""}
                                onChange={(e) => updateEnteryData("TypeDiseas", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="كود المجلس" variant="standard" value={selectedPatient?.EnteryData?.CouncilCode || ""}
                                onChange={(e) => updateEnteryData("CouncilCode", e.target.value)} type="number" />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="حالة المريض" variant="standard" value={selectedPatient?.EnteryData?.Condition || ""}
                                onChange={(e) => updateEnteryData("Condition", e.target.value)} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 4 }} spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="success" onClick={() => {
                            updatePatient(selectedPatient.id, selectedPatient);
                            onClose();
                        }}>Save Edit</Button>
                        <Button color="error" onClick={onClose}>Cancel</Button>
                        <Button variant="outlined" onClick={() => window.print()}>طباعة PDF window.print</Button>
                    </Stack>
                </Box>

            </DialogContent>
        </Dialog>
    );
}

