import { collection, /*addDoc, */ setDoc, updateDoc, doc, getDocs, deleteDoc } from "firebase/firestore"
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
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

export { addAllPatient, getAllPatients, updateAllPatient, deleteAllPatient }