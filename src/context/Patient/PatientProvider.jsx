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

    /* ======================= PREPARE IMPORT ======================= */
    const preparePatientImport = async (records) => {
        return await PatientServices.preparePatientImport(records);
    };

    /* ======================= IMPORT ======================= */
    const importPatients = async ({
        newPatients,
        conflicts,
        decisions,
    }) => {
        const result =
            await PatientServices.importPatientsWithDecisions(
                newPatients,
                conflicts,
                decisions
            );

        await refreshPatients();

        return result;
    };

    const deletePatientsBulk = async (ids) => {
        const uniqueIds = [...new Set(ids)];

        if (uniqueIds.length === 0) return;

        await PatientServices.deletePatientsBatch(uniqueIds);

        setPatient((prev) =>
            prev.filter((p) => !uniqueIds.includes(p.id))
        );
    };
    const exitPatientsBulk = async (ids, updatedFields) => {
        const uniqueIds = [...new Set(ids)];

        if (uniqueIds.length === 0) return;

        const selectedPatients = patient.filter((p) =>
            uniqueIds.includes(p.id)
        );

        if (selectedPatients.length !== uniqueIds.length) {
            throw new Error(
                "بعض المرضى المحددين غير موجودين في البيانات الحالية."
            );
        }

        const updatedPatients = selectedPatients.map((current) => {
            const numberDays = CalcDate(
                normalizeDateSafe(current.EnteryData?.EntryTime),
                normalizeDateSafe(updatedFields.ExitData?.ExitTime)
            );

            const amountOwed = CalcOwed(
                numberDays,
                current.FinancialData?.AmountPaid ?? 0
            );

            return {
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
        });

        await PatientServices.updatePatientsBatch(updatedPatients);

        const updatedById = new Map(
            updatedPatients.map((p) => [p.id, p])
        );

        setPatient((prev) =>
            prev.map((p) => updatedById.get(p.id) ?? p)
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
                preparePatientImport,
                importPatients,
                deletePatientsBulk,
                exitPatientsBulk
            }}
        >
            {children}
        </PatientsContext.Provider>
    );
}