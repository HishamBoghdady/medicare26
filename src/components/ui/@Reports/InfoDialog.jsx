import { useEffect, useState } from "react";
import {Button,Box,Dialog,DialogTitle,DialogContent,DialogActions} from "../../Lib/MuiComponents"

import {normalizeDateSafe} from '../../../utils/index';
const InfoDialog = ({ open, onClose, rowData }) => {
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        if (rowData?.FullData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedPatient(rowData.FullData);
        }
    }, [rowData]);

    return (
        <>
            <style>
                {`
/* ===== Dialog Title ===== */
.info-dialog-title {text-align: center; font-weight: bold; background-color: #1976d2; /* primary.main */ color: white;}

/* ===== Header Grid ===== */
.patient-grid {  display: grid; grid-template-columns: 140px 1fr; gap: 16px; margin-bottom: 24px; align-items: flex-start;}

@media (max-width: 600px) { .patient-grid {  grid-template-columns: 1fr; justify-items: center; text-align: center; }}

/* ===== Patient Image ===== */
.patient-image { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; width: 140px;}

.patient-image img {  width: 100%; display: block;}

/* ===== Patient Details ===== */
.patient-details {  display: flex; flex-direction: column; gap: 6px;}

.patient-details p {  margin: 0;}

.payment-title { margin-top: 8px; font-weight: bold; color: #d32f2f;}

/* ===== Table ===== */
.payment-table-wrapper { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;}

.payment-table { width: 100%; border-collapse: collapse; text-align: center;}

.payment-table th {  border: 1px solid #ccc; padding: 8px; background-color: #f5f5f5; font-weight: bold;}

.payment-table td { border: 1px solid #ccc; padding: 8px;}

.table-footer {  background-color: black;  color: white; font-weight: bold;}

.total-paid {  background-color: #e0e0e0; color: #2e7d32; font-weight: bold;}

.total-owed {  background-color: #e0e0e0; color: #d32f2f; font-weight: bold;}

/* ===== Dialog Actions ===== */
.dialog-actions { display: flex; justify-content: center; padding-bottom: 16px;}`
}
            </style>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle className="info-dialog-title">
                    تفاصيل المريض
                </DialogTitle>

                <DialogContent>
                    {selectedPatient && (
                        <Box dir="rtl">
                            {/* ===== Header ===== */}
                            <div className="patient-grid">
                                <div className="patient-image">
                                    <img src="/Elmanar.jpg" alt="صورة المريض" />
                                </div>

                                <div className="patient-details">
                                    <p><strong>الاسم:</strong> {selectedPatient.PersonalData.Name || "—"}</p>
                                    <p><strong>تاريخ الدخول:</strong> {normalizeDateSafe(selectedPatient.EnteryData.EntryTime) || "—"}</p>
                                    <p><strong>التحاليل:</strong> {selectedPatient.EnteryData.TypeDiseas || "—"}</p>
                                    <p><strong>رقم المجلس:</strong> {selectedPatient.EnteryData.CouncilCode || "—"}</p>

                                    <div className="payment-title">تفاصيل الدفع</div>
                                </div>
                            </div>

                            {/* ===== Table ===== */}
                            <div className="payment-table-wrapper">
                                <table className="payment-table">
                                    <thead>
                                        <tr>
                                            <th>المبلغ المدفوع</th>
                                            <th>تاريخ الدفع</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedPatient.PaymentsDetails.map((e, i) => (
                                            <tr key={i}>
                                                <td>{e.AmountPaid}</td>
                                                <td>{e.PaymentDate}</td>
                                            </tr>
                                        ))}

                                        <tr className="table-footer">
                                            <td>إجمالي المدفوع</td>
                                            <td>المبلغ المتبقي</td>
                                        </tr>

                                        <tr>
                                            <td className="total-paid">
                                                {selectedPatient.FinancialData.AmountPaid || 0}
                                            </td>
                                            <td className="total-owed">
                                                {selectedPatient.FinancialData.AmountOwed || 0}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions className="dialog-actions">
                    <Button variant="contained" onClick={onClose}>
                        إغلاق
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InfoDialog;
