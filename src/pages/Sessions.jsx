//Import MUI
import { Box, Paper, Typography, TextField, MenuItem, Button, Autocomplete } from "../components/Lib/MuiComponents";
import { SaveIcon, CancelIcon } from '../components/Lib/MuiIcon';
//Import Hooks
import { useState } from "react";
//Import Context Data
import usePatient from '../context/Patient/usePatient';
//Import Functions
import { normalizeDateSafe } from "../utils/index";
function Sessions() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [SessionDetails, setSessionDetails] = useState({ SessionDate: '', NumberSession: '' })
  const { patient, /**setPatient, */ addSession } = usePatient();

  const activePatients = patient.filter(
    p => p.EnteryData?.Condition !== "out"
  );
  function AddSession() {
    if (!selectedPatient) return;

    const session = {
      SessionDate: SessionDetails.SessionDate,
      NumberSession: Number(SessionDetails.NumberSession) || 0,
    };

    addSession(selectedPatient.id, session);
    Reset();
  }


  function Reset() {
    setSelectedPatient(null)
    setSessionDetails({ SessionDate: '', NumberSession: '' })
  }
  return (
    <Box sx={{ p: 1 }} component={'form'}>
      {/* عنوان الصفحة */}
      <Paper elevation={0} sx={{ p: 1, borderRadius: 3, border: "1px solid #d6d6d6", direction: "rtl", marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "right", color: "#0d47a1", }}> اضافة جلسات</Typography>

        <Box sx={{ p: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 1.5, md: 3 }, direction: "rtl", width: "100%", }}>
          {/* Right side */}
          <Box sx={{ width: "100%" }}>
            <Autocomplete
              fullWidth
              size="small"
              disablePortal
              options={activePatients}
              getOptionLabel={(option) => option?.PersonalData?.Name || ""}
              onChange={(event, newValue) => {
                if (!newValue) return;
                setSelectedPatient(newValue);
              }}

              renderInput={(params) => (
                <TextField {...params} label="بحث عن الاسم" />
              )}
            />
          </Box>
          {/* Left side */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 3 }, width: "100%", }}>
            <TextField label="الاسم" fullWidth size="small" value={selectedPatient?.PersonalData?.Name || ""} slotProps={{ input: { readOnly: true } }} />
            <TextField label="تاريخ الدخول" fullWidth size="small" value={normalizeDateSafe(selectedPatient?.EnteryData?.EntryTime) || ""} slotProps={{ input: { readOnly: true } }} />
          </Box>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 1, borderRadius: 3, border: "1px solid #d6d6d6", direction: "rtl", marginBottom: '20px' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "right", color: "#0d47a1", }}>تفاصيل الجلسات</Typography>
        <Box sx={{ p: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 1.5, md: 3 }, direction: "rtl", width: "100%", }}>
          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <Typography sx={{ mb: "6px", fontWeight: "bold", color: 'red' }}>تاريخ الجلسه</Typography>
            <TextField label="" fullWidth type="date"
              InputLabelProps={{ shrink: true }} sx={{ "& .MuiInputLabel-root": { color: "#ff0000ff", fontWeight: "bold", }, }} size="small"
              value={SessionDetails.SessionDate} onChange={(e) => { setSessionDetails(prev => ({ ...prev, SessionDate: e.target.value })) }} />
          </Box>

          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <Typography sx={{ mb: "6px", fontWeight: "bold", color: 'red' }}>عدد الجلسات</Typography>
            <TextField label="" fullWidth type="number"
              InputLabelProps={{ shrink: true }} sx={{ "& .MuiInputLabel-root": { color: "#ff0000ff", fontWeight: "bold", }, }} size="small"
              value={SessionDetails.NumberSession} onChange={(e) => { setSessionDetails(prev => ({ ...prev, NumberSession: e.target.value })) }} />
          </Box>

        </Box>
        <Box direction="row" spacing={2} sx={{ paddingRight: "14px", display: 'flex', gap: '10px' }}>
          <Button variant="contained" startIcon={<SaveIcon sx={{ ml: 1 }} />} color="success" onClick={AddSession}>  Save </Button>
          <Button variant="contained" startIcon={<CancelIcon sx={{ ml: 1 }} />} color="error" onClick={Reset}> Reset</Button>
        </Box>
      </Paper>

      {selectedPatient &&
        <Paper elevation={0} sx={{ p: 1, borderRadius: 3, border: "1px solid #d6d6d6", direction: "rtl", marginBottom: '20px' }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "right", color: "#0d47a1", }}>معلومات الجلسات</Typography>
        </Paper>}
    </Box>
  )
}

export default Sessions