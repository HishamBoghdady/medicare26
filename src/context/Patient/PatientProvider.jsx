import { useEffect, useState, useCallback } from "react";
import PatientsContext from "./PatientContext";

import {
    CalcDate,
    CalcOwed,
    CalcMoney,
    CalcSession,
    normalizeDateSafe
} from "../../utils";


import * as PatientServices from "../../services/PatientServices"


export default function PatientsProvider({ children }) {

    const [patient, setPatient] = useState([]);
    const [loading, setLoading] = useState(true);


    /* ======================= Fetch ======================= */
    const refreshPatients = useCallback(async () => {
        try {
            setLoading(true);
            const data = await PatientServices.getAllPatients();
            setPatient(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching patients:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshPatients();
    }, [refreshPatients]);

    /* ======================= ADD ======================= */
    const addpatient = async (patientData) => {
        const newPatient = await PatientServices.addAllPatient(patientData);

        if (!newPatient || !newPatient.id) {
            throw new Error("Failed to add patient: invalid response from service");
        }

        setPatient(prev => [...prev, newPatient]);
        return newPatient;
    }
    /* ======================= UPDATE ======================= */
    const updatePatient = async (id, changes) => {
        const current = patient.find((p) => p.id === id);
        if (!current) return;

        const entry = normalizeDateSafe(
            changes.EnteryData?.EntryTime ?? current.EnteryData?.EntryTime
        );

        const exit = normalizeDateSafe(
            changes.ExitData?.ExitTime ?? current.ExitData?.ExitTime
        );

        const paid =
            changes.FinancialData?.AmountPaid ??
            current.FinancialData?.AmountPaid ??
            0;

        const numberDays = CalcDate(entry, exit);
        const amountOwed = CalcOwed(numberDays, paid);
        const numberSession = CalcSession({ ...current, ...changes });

        const updated = {
            ...current,
            ...changes,
            FinancialData: {
                ...current.FinancialData,
                ...changes.FinancialData,
                NumberDays: numberDays,
                AmountPaid: paid,
                AmountOwed: amountOwed,
                NumberSession: numberSession,
            },
        };

        await PatientServices.updateAllPatient(id, updated);

        // تحديث محلي بدون إعادة fetch كاملة
        setPatient((prev) =>
            prev.map((p) => (p.id === id ? updated : p))
        );
    };

    /* ======================= DELETE ======================= */
    const deletePatient = async (id) => {
        await PatientServices.deleteAllPatient(id);
        setPatient((prev) => prev.filter((p) => p.id !== id));
    };
    /////////////////////


    /* ======================= EXIT ======================= */
    const exitPatient = async (id, updatedFields) => {
        const current = patient.find(p => p.id === id);
        if (!current) return;

        const numberDays = CalcDate(
            normalizeDateSafe(current.EnteryData?.EntryTime),
            normalizeDateSafe(updatedFields.ExitData?.ExitTime)
            // current.EnteryData?.EntryTime,
            // updatedFields.ExitData?.ExitTime
        );

        const amountOwed = CalcOwed(
            numberDays,
            current.FinancialData?.AmountPaid ?? 0
        );

        const updated = {
            ...current,
            ExitData: {
                ...current.ExitData,
                ...updatedFields.ExitData,
            },
            EnteryData: {
                ...current.EnteryData,
                Condition: "out",
            },
            FinancialData: {
                ...current.FinancialData,
                NumberDays: numberDays,
                AmountOwed: amountOwed,
            },
        };

        await PatientServices.updateAllPatient(id, updated);
        setPatient(prev =>
            prev.map(p => p.id === id ? updated : p)
        );
    };
    /* ======================= ADD PAYMENT ======================= */
    const addPayment = async (id, payment) => {
        const current = patient.find(p => p.id === id);
        if (!current) return;

        const payments = [...(current.PaymentsDetails || []), payment];
        const totalPaid = CalcMoney({
            ...current,
            PaymentsDetails: payments,
        });

        const amountOwed = CalcOwed(
            current.FinancialData?.NumberDays ?? 0,
            totalPaid
        );

        const updated = {
            ...current,
            PaymentsDetails: payments,
            FinancialData: {
                ...current.FinancialData,
                AmountPaid: totalPaid,
                AmountOwed: amountOwed,
            },
        }
        await PatientServices.updateAllPatient(id, updated);

        setPatient(prev =>
            prev.map(p => p.id === id ? updated : p)
        );
    };

    /* ======================= ADD SESSION ======================= */
    const addSession = async (id, session) => {
        const current = patient.find(p => p.id === id);
        if (!current) return;

        const sessions = [...(current.SessionDetails || []), session];
        const numberSession = CalcSession({
            ...current,
            SessionDetails: sessions,
        });

        const updated = {
            ...current,
            SessionDetails: sessions,
            FinancialData: {
                ...current.FinancialData,
                NumberSession: numberSession,
            },
        }
        await PatientServices.updateAllPatient(id, updated);

        setPatient(prev =>
            prev.map(p => p.id === id ? updated : p)
        );
    };

    return (
        <PatientsContext.Provider
            value={{
                patient,
                loading,
                refreshPatients,
                updatePatient,
                deletePatient,
                exitPatient,
                addSession,
                addPayment,
                addpatient,
                
                // setPatient,
            }}
        >
            {children}
        </PatientsContext.Provider>
    );
}
// import { useEffect, useState, useCallback } from "react";
// import PatientsContext from "./PatientContext";

// import {
//   CalcDate,
//   CalcOwed,
//   CalcMoney,
//   CalcSession,
//   normalizeDateSafe
// } from "../../utils";

// import * as PatientServices from "../../services/PatientServices";

// export default function PatientsProvider({ children }) {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ======================= Fetch ======================= */
//   const refreshPatients = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await PatientServices.getAllPatients();
//       setPatients(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching patients:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     refreshPatients();
//   }, [refreshPatients]);

//   /* ======================= Core Update Engine ======================= */
//   const updatePatientById = async (id, changesBuilder) => {
//     const current = patients.find(p => p.id === id);
//     if (!current) return;

//     // البناء الفعلي للـ updated object
//     const changes = changesBuilder(current);

//     const updated = {
//       ...current,
//       ...changes
//     };

//     await PatientServices.updateAllPatient(id, updated);

//     // تحديث محلي للـ state بدون refetch كامل
//     setPatients(prev => prev.map(p => p.id === id ? updated : p));
//   };

//   /* ======================= ADD ======================= */
//   const addPatient = async (patientData) => {
//     const newPatient = await PatientServices.addAllPatient(patientData);
//     setPatients(prev => [...prev, newPatient]);
//   };

//   /* ======================= DELETE ======================= */
//   const deletePatient = async (id) => {
//     await PatientServices.deleteAllPatient(id);
//     setPatients(prev => prev.filter(p => p.id !== id));
//   };

//   /* ======================= Specialized Actions ======================= */

//   const exitPatient = (id, updatedFields) => {
//     updatePatientById(id, current => {
//       const numberDays = CalcDate(
//         normalizeDateSafe(current.EnteryData?.EntryTime),
//         normalizeDateSafe(updatedFields.ExitData?.ExitTime)
//       );

//       const amountOwed = CalcOwed(
//         numberDays,
//         current.FinancialData?.AmountPaid ?? 0
//       );

//       return {
//         ExitData: {
//           ...current.ExitData,
//           ...updatedFields.ExitData,
//         },
//         EnteryData: {
//           ...current.EnteryData,
//           Condition: "out",
//         },
//         FinancialData: {
//           ...current.FinancialData,
//           NumberDays: numberDays,
//           AmountOwed: amountOwed,
//         }
//       };
//     });
//   };

//   const addPayment = (id, payment) => {
//     updatePatientById(id, current => {
//       const payments = [...(current.PaymentsDetails || []), payment];
//       const totalPaid = CalcMoney({ ...current, PaymentsDetails: payments });
//       const amountOwed = CalcOwed(current.FinancialData?.NumberDays ?? 0, totalPaid);

//       return {
//         PaymentsDetails: payments,
//         FinancialData: {
//           ...current.FinancialData,
//           AmountPaid: totalPaid,
//           AmountOwed: amountOwed,
//         }
//       };
//     });
//   };

//   const addSession = (id, session) => {
//     updatePatientById(id, current => {
//       const sessions = [...(current.SessionDetails || []), session];
//       const numberSession = CalcSession({ ...current, SessionDetails: sessions });

//       return {
//         SessionDetails: sessions,
//         FinancialData: {
//           ...current.FinancialData,
//           NumberSession: numberSession,
//         }
//       };
//     });
//   };

//   /* ======================= Provider ======================= */
//   return (
//     <PatientsContext.Provider
//       value={{
//         patients,
//         loading,
//         refreshPatients,
//         addPatient,
//         updatePatient: updatePatientById,
//         deletePatient,
//         exitPatient,
//         addPayment,
//         addSession,
//       }}
//     >
//       {children}
//     </PatientsContext.Provider>
//   );
// }

