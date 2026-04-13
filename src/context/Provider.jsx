import { BrowserRouter } from "react-router-dom";
import PatientsProvider from "./Patient/PatientProvider";
import ThemeProvider from "./ThemeMode/ThemeProvider";
import AuthProvider from "./auth/AuthProvider";
export default function AppProviders({ children }) {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <PatientsProvider>
                        {children}
                    </PatientsProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
