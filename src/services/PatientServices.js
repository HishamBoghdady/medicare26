import { collection, /*addDoc, */ setDoc, updateDoc, doc, getDocs, deleteDoc, writeBatch } from "firebase/firestore"
import { db } from "../firebase/firebase.config";

// Add Data (Crud)
const addAllPatient = async (patient) => {
    try {
        await setDoc(doc(db, "patientsDB", patient.id), patient);
        console.log("✅ تمت الإضافة:", patient);
        return patient;
        // await setDoc(doc(db, "patients", patient.id), patient);

    } catch (error) {
        console.error("❌ خطأ في الإضافة:", error);
        throw error;
    }
};
// const addAllPatient = async (patient) => {
//     const docRef = await addDoc(collection(db, "patientsDB"), patient);
//     return { id: docRef.id, ...patient };
// };


// Read Data (cRud)
const getAllPatients = async () => {
    const querySnapshot = await getDocs(collection(db, "patientsDB"));
    // const querySnapshot = await getDocs(collection(db, "patients"));
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
};

// Edit Data (crUd)
const updateAllPatient = async (id, newData) => {
    const docRef = doc(db, "patientsDB", id);
    // const docRef = doc(db, "patients", id);
    await updateDoc(docRef, newData);
};

// Delete Data (cruD)
const deleteAllPatient = async (id) => {
    await deleteDoc(doc(db, "patientsDB", id));
    // await deleteDoc(doc(db, "patients", id));
};

// Prepare import: compare backup records with Firestore
const preparePatientImport = async (records) => {
    const currentPatients = await getAllPatients();
    const currentById = new Map(
        currentPatients.map((patient) => [patient.id, patient])
    );

    const incomingIds = new Set();
    const newPatients = [];
    const conflicts = [];
    const invalidPatients = [];

    records.forEach((record, index) => {
        if (
            !record ||
            typeof record !== "object" ||
            Array.isArray(record) ||
            typeof record.id !== "string" ||
            !record.id.trim()
        ) {
            invalidPatients.push({
                index,
                reason: "Missing or invalid patient ID",
            });
            return;
        }

        if (incomingIds.has(record.id)) {
            invalidPatients.push({
                index,
                id: record.id,
                reason: "Duplicate ID in backup",
            });
            return;
        }

        incomingIds.add(record.id);

        const current = currentById.get(record.id);

        if (current) {
            conflicts.push({
                id: record.id,
                current,
                incoming: record,
            });
        } else {
            newPatients.push(record);
        }
    });

    return {
        newPatients,
        conflicts,
        invalidPatients,
    };
};

// Apply the decisions made by the user
const importPatientsWithDecisions = async (
    newPatients,
    conflicts,
    decisions
) => {
    const operations = [];

    for (const patient of newPatients) {
        operations.push({
            id: patient.id,
            data: patient,
        });
    }

    for (const conflict of conflicts) {
        const decision = decisions[conflict.id];

        if (decision === "replace") {
            operations.push({
                id: conflict.id,
                data: conflict.incoming,
            });
        } else if (decision !== "skip") {
            throw new Error(
                `Missing import decision for patient ${conflict.id}`
            );
        }
    }

    // Firestore batches have a maximum number of writes.
    const CHUNK_SIZE = 450;

    for (let i = 0; i < operations.length; i += CHUNK_SIZE) {
        const batch = writeBatch(db);
        const chunk = operations.slice(i, i + CHUNK_SIZE);

        for (const operation of chunk) {
            const patientRef = doc(db, "patientsDB", operation.id);
            batch.set(patientRef, operation.data);
        }

        await batch.commit();
    }

    return {
        imported: operations.length,
        skipped: conflicts.filter(
            (conflict) => decisions[conflict.id] === "skip"
        ).length,
    };
};

export { addAllPatient, getAllPatients, updateAllPatient, deleteAllPatient, preparePatientImport, importPatientsWithDecisions }