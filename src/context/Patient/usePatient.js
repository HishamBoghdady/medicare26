import { useContext } from "react";
import PatientsContext from "./PatientContext";

export default function usePatients() {
  const context = useContext(PatientsContext);

  if (!context) {
    throw new Error("usePatients must be used inside PatientsProvider");
  }

  return context;
}
