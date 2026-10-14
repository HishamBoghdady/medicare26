import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase.config";
const patientsCollection = collection(db, "patientsDB");
export const getPatientsForBackup = async () => {
    const snapshot = await getDocs(patientsCollection);

    return snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
};
