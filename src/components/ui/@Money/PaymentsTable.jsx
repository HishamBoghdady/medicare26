// import { useState, useEffect } from "react";

// import {Table,TableBody,Button,TableContainer,TableHead,TableRow,Paper,
// Box,Stack,Typography,Divider,TextField,Chip,
// } from "../../Lib/MuiComponents";
// import {DeleteIcon,AddIcon,UndoIcon,SaveIcon } from "../../Lib/MuiIcon"

// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { styled } from "@mui/material/styles";

// import { updateAllPatient } from "../../../services/PatientServices";
// const StyledTableCell = styled(TableCell)(() => ({
//     [`&.${tableCellClasses.head}`]: {
//         background: "linear-gradient(45deg, #1e1e2f, #2c2c3e)",
//         color: "#fff",
//         fontWeight: 600,
//         fontSize: 15,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));


// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
//     "&:last-child td, &:last-child th": { border: 0 },
// }));

// export default function PaymentsTable({ patient, setPatient }) {

//     const [rows, setRows] = useState([]);
//     const [historyStack, setHistoryStack] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setRows(patient?.PaymentsDetails?.map(r => ({ ...r })) || []);
//     }, [patient]);

//     const calculateTotal = (rows) =>
//         rows.reduce((sum, p) => sum + (Number(p.AmountPaid) || 0), 0);

//     const pushHistory = (currentRows) => {
//         setHistoryStack(prev => [...prev, currentRows.map(r => ({ ...r }))]);
//     };

//     const updateLocalAndParent = (newRows) => {
//         const totalPaid = calculateTotal(newRows);

//         const updatedPatient = {
//             ...patient,
//             PaymentsDetails: newRows.map(r => ({ ...r })),
//             FinancialData: {
//                 ...patient.FinancialData,
//                 AmountPaid: totalPaid,
//             },
//         };

//         setRows(newRows.map(r => ({ ...r })));

//         setPatient(prev =>
//             prev.map(p =>
//                 p.id === updatedPatient.id ? updatedPatient : p
//             )
//         );

//         return updatedPatient;
//     };

//     const handleEditChange = (index, field, value) => {
//         pushHistory(rows);

//         const newRows = rows.map((row, i) =>
//             i === index
//                 ? { ...row, [field]: field === "AmountPaid" ? Number(value) : value }
//                 : { ...row }
//         );

//         updateLocalAndParent(newRows);
//     };

//     const handleAddRow = () => {
//         pushHistory(rows);

//         const newRows = [
//             ...rows.map(r => ({ ...r })),
//             {
//                 id: crypto.randomUUID(),
//                 PaymentDate: new Date().toISOString().slice(0, 10),
//                 AmountPaid: 0,
//             },
//         ];

//         updateLocalAndParent(newRows);
//     };

//     const handleDelete = (index) => {
//         if (!window.confirm("هل أنت متأكد؟")) return;

//         pushHistory(rows);

//         const newRows = rows
//             .filter((_, i) => i !== index)
//             .map(r => ({ ...r }));

//         updateLocalAndParent(newRows);
//     };

//     const handleUndo = () => {
//         const last = historyStack[historyStack.length - 1];
//         if (!last) return alert("لا يوجد شيء للتراجع");

//         setHistoryStack(prev => prev.slice(0, -1));
//         updateLocalAndParent(last.map(r => ({ ...r })));
//     };

//     const handleSaveAll = async () => {
//         try {
//             setLoading(true);
//             const updatedPatient = updateLocalAndParent(rows);
//             await updateAllPatient(updatedPatient.id, updatedPatient);
//             alert("✅ تم الحفظ بنجاح");
//         } catch (error) {
//             console.error(error);
//             alert("❌ حدث خطأ أثناء الحفظ");
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <>
//             <Box sx={{ p: 3 }}>

//                 {/* ====== Summary Card ====== */}
//                 <Paper
//                     elevation={4}
//                     sx={{
//                         p: 3,
//                         mb: 3,
//                         borderRadius: 3,
//                         background: "linear-gradient(135deg, #1976d2, #42a5f5)",
//                         color: "#fff",
//                     }}
//                 >
//                     <Stack
//                         direction={{ xs: "column", md: "row" }}
//                         justifyContent="space-between"
//                         spacing={2}
//                     >
//                         <Box>
//                             <Typography variant="h6">إجمالي المدفوع</Typography>
//                             <Typography variant="h4" fontWeight="bold">
//                                 {patient?.FinancialData?.AmountPaid || 0} EGP
//                             </Typography>
//                         </Box>

//                         <Divider flexItem orientation="vertical" sx={{ borderColor: "#fff" }} />

//                         <Box>
//                             <Typography variant="h6">المتبقي</Typography>
//                             <Typography variant="h4" fontWeight="bold">
//                                 {patient?.FinancialData?.AmountOwed || 0} EGP
//                             </Typography>
//                         </Box>
//                     </Stack>
//                 </Paper>

//                 {/* ====== Table ====== */}
//                 <TableContainer
//                     component={Paper}
//                     elevation={4}
//                     sx={{ borderRadius: 3, overflow: "hidden" }}
//                 >
//                     <Table stickyHeader>
//                         <TableHead>
//                             <TableRow>
//                                 <StyledTableCell>#</StyledTableCell>
//                                 <StyledTableCell>تاريخ الدفع</StyledTableCell>
//                                 <StyledTableCell>المبلغ</StyledTableCell>
//                                 <StyledTableCell align="center">الإجراءات</StyledTableCell>
//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {rows.map((row, idx) => (
//                                 <StyledTableRow
//                                     key={row.id}
//                                     sx={{
//                                         transition: "0.2s",
//                                         "&:hover": {
//                                             backgroundColor: "#f5f5f5",
//                                             transform: "scale(1.01)",
//                                         },
//                                     }}
//                                 >
//                                     <StyledTableCell>{idx + 1}</StyledTableCell>

//                                     <StyledTableCell>
//                                         <TextField
//                                             type="date"
//                                             size="small"
//                                             value={row.PaymentDate || ""}
//                                             onChange={(e) =>
//                                                 handleEditChange(idx, "PaymentDate", e.target.value)
//                                             }
//                                         />
//                                     </StyledTableCell>

//                                     <StyledTableCell>
//                                         <TextField
//                                             type="number"
//                                             size="small"
//                                             value={row.AmountPaid || ""}
//                                             onChange={(e) =>
//                                                 handleEditChange(idx, "AmountPaid", e.target.value)
//                                             }
//                                             InputProps={{
//                                                 endAdornment: (
//                                                     <Chip label="EGP" size="small" color="primary" />
//                                                 ),
//                                             }}
//                                         />
//                                     </StyledTableCell>

//                                     <StyledTableCell align="center">
//                                         <Button
//                                             variant="contained"
//                                             color="error"
//                                             size="small"
//                                             startIcon={<DeleteIcon />}
//                                             onClick={() => handleDelete(idx)}
//                                         >
//                                             حذف
//                                         </Button>
//                                     </StyledTableCell>
//                                 </StyledTableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {/* ====== Action Buttons ====== */}
//                 <Stack
//                     direction={{ xs: "column", sm: "row" }}
//                     spacing={2}
//                     sx={{ mt: 3 }}
//                 >
//                     <Button
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                         onClick={handleAddRow}
//                     >
//                         إضافة دفعة
//                     </Button>

//                     <Button
//                         variant="outlined"
//                         startIcon={<UndoIcon />}
//                         onClick={handleUndo}
//                     >
//                         تراجع
//                     </Button>

//                     <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSaveAll}
//                         disabled={loading}
//                     >
//                         حفظ الكل
//                     </Button>
//                 </Stack>
//             </Box>
//         </>
//     );
// }

import { useState, useEffect, useMemo } from "react";

import {
  Table,
  TableBody,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  Typography,
  Divider,
  TextField,
  Chip,
} from "../../Lib/MuiComponents";
import { DeleteIcon, AddIcon, UndoIcon, SaveIcon } from "../../Lib/MuiIcon";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import usePatient from "../../../context/Patient/usePatient";
import { CalcDate, CalcOwed, normalizeDateSafe } from "../../../utils";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(45deg, #1e1e2f, #2c2c3e)",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

export default function PaymentsTable({ patient }) {
  const { updatePatient } = usePatient();

  const [rows, setRows] = useState([]);
  const [historyStack, setHistoryStack] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRows(patient?.PaymentsDetails?.map((r) => ({ ...r })) || []);
    setHistoryStack([]);
  }, [patient]);

  const calculateTotal = (items) =>
    items.reduce((sum, p) => sum + (Number(p.AmountPaid) || 0), 0);

  const numberDays = useMemo(() => {
    const entry = normalizeDateSafe(patient?.EnteryData?.EntryTime);
    const exit = normalizeDateSafe(patient?.ExitData?.ExitTime);
    return CalcDate(entry, exit);
  }, [patient?.EnteryData?.EntryTime, patient?.ExitData?.ExitTime]);

  const previewPaid = useMemo(() => calculateTotal(rows), [rows]);
  const previewOwed = useMemo(
    () => CalcOwed(numberDays, previewPaid),
    [numberDays, previewPaid]
  );

  const pushHistory = (currentRows) => {
    setHistoryStack((prev) => [...prev, currentRows.map((r) => ({ ...r }))]);
  };

  const updateLocalOnly = (newRows) => {
    setRows(newRows.map((r) => ({ ...r })));
  };

  const handleEditChange = (index, field, value) => {
    pushHistory(rows);

    const newRows = rows.map((row, i) =>
      i === index
        ? {
            ...row,
            [field]: field === "AmountPaid" ? Number(value) || 0 : value,
          }
        : { ...row }
    );

    updateLocalOnly(newRows);
  };

  const handleAddRow = () => {
    pushHistory(rows);

    const newRows = [
      ...rows.map((r) => ({ ...r })),
      {
        id: crypto.randomUUID(),
        PaymentDate: new Date().toISOString().slice(0, 10),
        AmountPaid: 0,
      },
    ];

    updateLocalOnly(newRows);
  };

  const handleDelete = (index) => {
    if (!window.confirm("هل أنت متأكد؟")) return;

    pushHistory(rows);

    const newRows = rows.filter((_, i) => i !== index).map((r) => ({ ...r }));
    updateLocalOnly(newRows);
  };

  const handleUndo = () => {
    const last = historyStack[historyStack.length - 1];
    if (!last) return alert("لا يوجد شيء للتراجع");

    setHistoryStack((prev) => prev.slice(0, -1));
    updateLocalOnly(last.map((r) => ({ ...r })));
  };

  const handleSaveAll = async () => {
    if (!patient?.id) return;

    try {
      setLoading(true);

      const normalizedRows = rows.map((r, idx) => ({
        ...r,
        id: r.id || `${patient.id}-pay-${idx}`,
        PaymentDate: r.PaymentDate || new Date().toISOString().slice(0, 10),
        AmountPaid: Number(r.AmountPaid) || 0,
      }));

      const totalPaid = calculateTotal(normalizedRows);
      const amountOwed = CalcOwed(numberDays, totalPaid);

      await updatePatient(patient.id, {
        PaymentsDetails: normalizedRows,
        FinancialData: {
          ...patient.FinancialData,
          AmountPaid: totalPaid,
          NumberDays: numberDays,
          AmountOwed: amountOwed,
        },
      });

      setRows(normalizedRows);
      alert("✅ تم الحفظ بنجاح");
    } catch (error) {
      console.error(error);
      alert("❌ حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "#fff",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="h6">إجمالي المدفوع</Typography>
            <Typography variant="h4" fontWeight="bold">
              {previewPaid || 0} EGP
            </Typography>
          </Box>

          <Divider flexItem orientation="vertical" sx={{ borderColor: "#fff" }} />

          <Box>
            <Typography variant="h6">المتبقي</Typography>
            <Typography variant="h4" fontWeight="bold">
              {previewOwed || 0} EGP
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <TableContainer
        component={Paper}
        elevation={4}
        sx={{ borderRadius: 3, overflow: "hidden" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>تاريخ الدفع</StyledTableCell>
              <StyledTableCell>المبلغ</StyledTableCell>
              <StyledTableCell align="center">الإجراءات</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, idx) => (
              <StyledTableRow
                key={row.id || idx}
                sx={{
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "scale(1.01)",
                  },
                }}
              >
                <StyledTableCell>{idx + 1}</StyledTableCell>

                <StyledTableCell>
                  <TextField
                    type="date"
                    size="small"
                    value={row.PaymentDate || ""}
                    onChange={(e) =>
                      handleEditChange(idx, "PaymentDate", e.target.value)
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={row.AmountPaid ?? ""}
                    onChange={(e) =>
                      handleEditChange(idx, "AmountPaid", e.target.value)
                    }
                    InputProps={{
                      endAdornment: <Chip label="EGP" size="small" color="primary" />,
                    }}
                  />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(idx)}
                  >
                    حذف
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddRow}>
          إضافة دفعة
        </Button>

        <Button variant="outlined" startIcon={<UndoIcon />} onClick={handleUndo}>
          تراجع
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleSaveAll}
          disabled={loading}
        >
          حفظ الكل
        </Button>
      </Stack>
    </Box>
  );
}
