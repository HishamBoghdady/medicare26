//Import Hooks
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid'
//Import MUI
import { Box, Button, Typography } from "../components/Lib/MuiComponents"
import { PersonAddAltIcon } from "../components/Lib/MuiIcon"
//Import UI Components
import { EnteryData, PersonalData, AdmissionApplicant, InitialPayment } from "../components/ui/@DashboardData/index"
//Schema Data
import { SchemeDB } from '../guards/SchemeDB'
//Import Functions
// import { CalcMoney } from "../utils/index";
import { CalcMoney, CalcDate, CalcOwed } from "../utils/index";

import usePatients from "../context/Patient/usePatient"


const PaperStyle = { direction: "rtl", border: "2px solid #dee2e6", borderRadius: "8px", p: "20px", mb: "20px" };
const TypographyStyle = { mb: 2, fontWeight: "bold", color: "#0d47a1", }
const DividerStyle = { width: "100%", height: "1px", backgroundColor: "#d0d0d0", mb: 3, }
const GridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", mb: "20px", }

export default function DashboardData() {
  
  const { addpatient } = usePatients();

  const [enteryData, setEnteryData] = useState(SchemeDB.EnteryData);
  const [personalData, setPersonalData] = useState(SchemeDB.PersonalData);
  const [admissionApplicant, setAdmissionApplicant] = useState(SchemeDB.AdmissionApplicant);
  const [addMoneyDetail, setAddDetailMoney] = useState({ PaymentDate: '', AmountPaid: '' })
  //×××××××××××
  const initialPaid = CalcMoney({ PaymentsDetails: [addMoneyDetail] });
  const initialDays = CalcDate(enteryData.EntryTime, null); // من تاريخ الدخول إلى اليوم
  const initialOwed = CalcOwed(initialDays, initialPaid);

  //××××××××××
  const handleEnteryChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setEnteryData(prev => ({ ...prev, [field]: value }));
  }, []);
  const handlePersonalChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setPersonalData(prev => ({ ...prev, [field]: value }));
  }, []);
  const handleAdmissionChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setAdmissionApplicant(prev => ({ ...prev, [field]: value }));
  }, []);
  const handleMoneyDetailChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setAddDetailMoney(prev => ({ ...prev, [field]: value }));
  }, []);

  //----------------------start freee

  const AddPatient = useCallback(async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    const PatientAdd = {
      id: uuidv4(),
      EnteryData: {
        EntryMaterial: enteryData.EntryMaterial,
        EntryTime: enteryData.EntryTime,
        TypeDiseas: enteryData.TypeDisease, // صحح Typo هنا
        CouncilCode: enteryData.CouncilCode,
        Condition: enteryData.Condition || "in",
      },
      PersonalData: {
        Name: personalData.Name,
        Address: personalData.Address,
        ID: personalData.ID,
        Gender: personalData.Gender,
        Work: personalData.Work,
        Age: Number(personalData.Age) || null,
        Religion: personalData.Religion,
        SocialStatus: personalData.SocialStatus,
        Nationnality: personalData.Nationnality
      },
      AdmissionApplicant: {
        Name: admissionApplicant.Name,
        Address: admissionApplicant.Address,
        ID: admissionApplicant.ID,
        Work: admissionApplicant.Work,
        Kinship: admissionApplicant.Kinship,
        Nationnality: admissionApplicant.Nationnality,
        PhoneNumber: admissionApplicant.PhoneNumber,
        ApprovalSession: admissionApplicant.ApprovalSession
      },
      ExitData: { ExitTime: null, ReasonExit: '' },
      FinancialData: {
        NumberDays: initialDays,
        NumberSession: null,
        AmountPaid: initialPaid,
        AmountOwed: initialOwed
      },
      PaymentsDetails: [addMoneyDetail],
      SessionDetails: []
    };
    try {
      // ✅ إضافة المريض إلى Firebase
      await addpatient(PatientAdd);

      setEnteryData(SchemeDB.EnteryData);
      setPersonalData(SchemeDB.PersonalData);
      setAdmissionApplicant(SchemeDB.AdmissionApplicant);
      setAddDetailMoney({ PaymentDate: '', AmountPaid: '' });
      console.log("Patient added successfully to Firebase:", PatientAdd);
    } catch (error) {
      console.error("Failed to add patient to Firebase:", error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteryData, personalData, admissionApplicant, addMoneyDetail]);
  //************************** */
  return (
    <Box sx={{ p: 1 }} component={'form'} onSubmit={AddPatient}>
      {/* عنوان الصفحة */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "right", color: "#0d47a1", }}> تسجيل حالة</Typography>

      <EnteryData
        PaperStyle={PaperStyle}
        TypographyStyle={TypographyStyle}
        DividerStyle={DividerStyle}
        GridStyle={GridStyle}
        data={enteryData}
        onChange={handleEnteryChange} />

      <PersonalData
        PaperStyle={PaperStyle}
        TypographyStyle={TypographyStyle}
        DividerStyle={DividerStyle}
        GridStyle={GridStyle}
        data={personalData}
        onChange={handlePersonalChange} />

      <AdmissionApplicant
        PaperStyle={PaperStyle}
        TypographyStyle={TypographyStyle}
        DividerStyle={DividerStyle}
        GridStyle={GridStyle}
        data={admissionApplicant}
        onChange={handleAdmissionChange} />

      <InitialPayment
        PaperStyle={PaperStyle}
        TypographyStyle={TypographyStyle}
        DividerStyle={DividerStyle}
        GridStyle={GridStyle}
        data={addMoneyDetail}
        onChange={handleMoneyDetailChange} />

      <Box sx={{ textAlign: 'right' }}>
        <Button variant="contained" endIcon={<PersonAddAltIcon />} type="submit"> Add</Button>
      </Box>
    </Box>
  );
}
