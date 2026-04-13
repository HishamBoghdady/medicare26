import { useState, useMemo } from "react";
import ThemeContext from "./ThemeContext";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(() =>
        createTheme({
            direction: "rtl",
            palette: {
                mode: darkMode ? "dark" : "light",
                navbarBg: darkMode ? "#121212" : "linear-gradient(45deg, #3e0480, #103cbe)",
                color: darkMode ? 'white' : 'black',
            },
            typography: {
                // fontFamily:'"Amiri", serif',
                // fontFamily: "'cairo',san-serif",
                fontFamily: "Tajawal, Arial",


            },
            components: {
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        fontSize: "16px",
                    },
                },
            },
        },
        }, 
        
    ), [darkMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};