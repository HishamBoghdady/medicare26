// src/pages/Money.jsx

//Import MUI
import { Box, Paper, Typography, TextField, Button, Autocomplete } from "../components/Lib/MuiComponents";
import { SaveIcon, CancelIcon } from '../components/Lib/MuiIcon';
//Import Hooks
import { useState, useMemo } from "react";
//Import Context Data
import usePatient from '../context/Patient/usePatient';
//Import Functions
import { normalizeDateSafe } from "../utils/index";

import PaymentsTable from '../components/ui/@Money/PaymentsTable';

function Money() {
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [MoneyDetails, setMoneyDetails] = useState({ PaymentDate: '', AmountPaid: '' });

    const { patient, addPayment } = usePatient();

    const selectedPatient = useMemo(
        () => patient.find((p) => p.id === selectedPatientId) || null,
        [patient, selectedPatientId]
    );

    async function AddMoney() {
        if (!selectedPatient) return;
        if (!MoneyDetails.PaymentDate || !MoneyDetails.AmountPaid) return;

        await addPayment(selectedPatient.id, {
            id: crypto.randomUUID(),
            PaymentDate: MoneyDetails.PaymentDate,
            AmountPaid: Number(MoneyDetails.AmountPaid) || 0,
        });

        setMoneyDetails({ PaymentDate: '', AmountPaid: '' });
    }

    function Reset() {
        setMoneyDetails({ PaymentDate: '', AmountPaid: '' });
    }

    const activePatients = patient.filter(
        p => p.EnteryData?.Condition !== "out"
    );

    return (
        <Box sx={{ p: 1 }} component={'form'}>
            {/* عنوان الصفحة */}
            <Paper elevation={0} sx={{ p: 1, borderRadius: 3, border: "1px solid #d6d6d6", direction: "rtl", marginBottom: '20px' }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "right", color: "#0d47a1" }}>
                    اضافة مدفوعات
                </Typography>

                <Box sx={{ p: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 1.5, md: 3 }, direction: "rtl", width: "100%" }}>
                    <Box sx={{ width: "100%" }}>
                        <Autocomplete
                            fullWidth
                            size="small"
                            disablePortal
                            options={activePatients}
                            getOptionLabel={(option) => option?.PersonalData?.Name || ""}
                            value={selectedPatient}
                            onChange={(event, newValue) => {
                                setSelectedPatientId(newValue?.id || "");
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="بحث عن الاسم" />
                            )}
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 3 }, width: "100%" }}>
                        <TextField
                            label="الاسم"
                            fullWidth
                            size="small"
                            value={selectedPatient?.PersonalData?.Name || ""}
                            slotProps={{ input: { readOnly: true } }}
                        />
                        <TextField
                            label="تاريخ الدخول"
                            fullWidth
                            size="small"
                            value={normalizeDateSafe(selectedPatient?.EnteryData?.EntryTime) || ""}
                            slotProps={{ input: { readOnly: true } }}
                        />
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: 1, borderRadius: 3, border: "1px solid #d6d6d6", direction: "rtl", marginBottom: '20px' }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "right", color: "#0d47a1" }}>
                    تفاصيل المدفوعات
                </Typography>

                <Box sx={{ p: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 1.5, md: 3 }, direction: "rtl", width: "100%" }}>
                    <Box sx={{ width: "100%", maxWidth: 600 }}>
                        <Typography sx={{ mb: "6px", fontWeight: "bold", color: 'red' }}> تاريخ الدفع </Typography>
                        <TextField
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            sx={{ "& .MuiInputLabel-root": { color: "#ff0000ff", fontWeight: "bold" } }}
                            size="small"
                            value={MoneyDetails.PaymentDate}
                            onChange={(e) => setMoneyDetails(prev => ({ ...prev, PaymentDate: e.target.value }))}
                        />
                    </Box>

                    <Box sx={{ width: "100%", maxWidth: 600 }}>
                        <Typography sx={{ mb: "6px", fontWeight: "bold", color: 'red' }}> المبلغ المدفوع </Typography>
                        <TextField
                            fullWidth
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            sx={{ "& .MuiInputLabel-root": { color: "#ff0000ff", fontWeight: "bold" } }}
                            size="small"
                            value={MoneyDetails.AmountPaid}
                            onChange={(e) => setMoneyDetails(prev => ({ ...prev, AmountPaid: e.target.value }))}
                        />
                    </Box>
                </Box>

                <Box direction="row" spacing={2} sx={{ paddingRight: "14px", display: 'flex', gap: '10px' }}>
                    <Button variant="contained" startIcon={<SaveIcon sx={{ ml: 1 }} />} color="success" onClick={AddMoney}>
                        Save
                    </Button>
                    <Button variant="contained" startIcon={<CancelIcon sx={{ ml: 1 }} />} color="error" onClick={Reset}>
                        Reset
                    </Button>
                </Box>
            </Paper>

            {selectedPatient && (
                <Paper elevation={0} sx={{ p: 1, borderRadius: 3, border: "1px solid #d6d6d6", direction: "rtl", marginBottom: '20px' }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "right", color: "#0d47a1" }}>
                        معلومات المدفوعات
                    </Typography>

                    <PaymentsTable patient={selectedPatient} />
                </Paper>
            )}
        </Box>
    );
}

export default Money;
