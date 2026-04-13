import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0A84FF" },
    background: { default: "#F7F9FC" },
  },
  typography: {
    fontFamily: "'IBM Plex Sans Arabic', 'Segoe UI', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "15px",
          letterSpacing: "0.01em",
        },
      },
    },
  },
});

export default function MedicalLandingLight() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Box sx={{ minHeight: "100vh", background: "#F7F9FC", direction: "rtl" }}>

        {/* Subtle top gradient strip */}
        <Box sx={{
          position: "fixed", top: 0, left: 0, right: 0,
          height: 3,
          background: "linear-gradient(90deg, #0A84FF, #34C759, #0A84FF)",
          backgroundSize: "200% 100%",
          animation: "slide 3s linear infinite",
          zIndex: 200,
          "@keyframes slide": {
            "0%": { backgroundPosition: "0% 0%" },
            "100%": { backgroundPosition: "200% 0%" },
          }
        }} />

        {/* Navbar */}
        <Box sx={{
          position: "fixed", top: 3, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(247,249,252,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
          transition: "all 0.35s ease",
        }}>
          <Container maxWidth="md">
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.8 }}>
              {/* Logo */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: "9px",
                  background: "#0A84FF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px",
                }}>⚕️</Box>
                <Typography sx={{
                  fontWeight: 700, fontSize: "18px", color: "#0D1117",
                  letterSpacing: "-0.02em",
                }}>
                  MediCore
                </Typography>
              </Box>

              {/* Nav */}
              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3.5 }}>
                {["الخدمات", "الأطباء", "تواصل معنا"].map(item => (
                  <Typography key={item} sx={{
                    fontSize: "14px", fontWeight: 500,
                    color: "#5A6677", cursor: "pointer",
                    "&:hover": { color: "#0A84FF" },
                    transition: "color 0.2s",
                  }}>{item}</Typography>
                ))}
              </Box>

              {/* Login */}
              <Button
                variant="contained"
                disableElevation
                sx={{
                  background: "#0A84FF",
                  px: 2.5, py: 0.9,
                  fontSize: "14px",
                  "&:hover": { background: "#0070E0" },
                }}
              >
                تسجيل الدخول
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Hero */}
        <Container maxWidth="md">
          <Box sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            pt: 14,
            pb: 10,
          }}>

            {/* Icon */}
            <Box sx={{
              width: 72, height: 72,
              borderRadius: "20px",
              background: "#EAF3FF",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "34px",
              mb: 4,
              boxShadow: "0 4px 20px rgba(10,132,255,0.12)",
            }}>🏥</Box>

            {/* Heading */}
            <Typography sx={{
              fontWeight: 700,
              fontSize: { xs: "36px", md: "54px" },
              color: "#0D1117",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              mb: 2.5,
            }}>
              رعايتك الصحية{" "}
              <Box component="span" sx={{ color: "#0A84FF" }}>
                في يدك
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography sx={{
              fontSize: { xs: "16px", md: "18px" },
              color: "#6B7A8D",
              maxWidth: 480,
              lineHeight: 1.7,
              mb: 5,
              fontWeight: 400,
            }}>
              نظام إدارة طبي متكامل يوفر لك الوصول الفوري لأطبائك وملفاتك الصحية من أي مكان وفي أي وقت.
            </Typography>

            {/* CTA Buttons */}
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center", mb: 7 }}>
              <Button
                variant="contained"
                disableElevation
                size="large"
                sx={{
                  background: "#0A84FF",
                  px: 4, py: 1.4,
                  fontSize: "16px",
                  boxShadow: "0 4px 16px rgba(10,132,255,0.3)",
                  "&:hover": {
                    background: "#0070E0",
                    boxShadow: "0 6px 24px rgba(10,132,255,0.4)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                ابدأ مجاناً
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#D0D8E4",
                  color: "#374151",
                  px: 4, py: 1.4,
                  fontSize: "16px",
                  "&:hover": {
                    borderColor: "#0A84FF",
                    color: "#0A84FF",
                    background: "transparent",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                تعرف أكثر
              </Button>
            </Box>

            {/* Social Proof */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 34, height: 34, fontSize: "15px", border: "2px solid #F7F9FC !important" } }}>
                {["👨‍⚕️","👩‍⚕️","👨‍⚕️","👩‍⚕️"].map((e,i) => (
                  <Avatar key={i} sx={{ background: ["#E3F0FF","#E8F8EF","#FFF3E0","#F3E8FF"][i] }}>{e}</Avatar>
                ))}
              </AvatarGroup>
              <Typography sx={{ fontSize: "13px", color: "#8A95A3" }}>
                <Box component="span" sx={{ color: "#0D1117", fontWeight: 600 }}>+10,000</Box> طبيب ومريض يثقون بنا
              </Typography>
            </Box>

            {/* Feature Pills */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { icon: "🔒", label: "بيانات آمنة ومشفرة" },
                { icon: "📅", label: "حجز مواعيد فوري" },
                { icon: "📋", label: "ملف طبي رقمي" },
                { icon: "💬", label: "استشارة عبر الإنترنت" },
              ].map(({ icon, label }) => (
                <Box key={label} sx={{
                  display: "flex", alignItems: "center", gap: 0.8,
                  background: "#fff",
                  border: "1px solid #E8ECF2",
                  borderRadius: "100px",
                  px: 2, py: 0.9,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#0A84FF",
                    boxShadow: "0 4px 16px rgba(10,132,255,0.1)",
                    transform: "translateY(-2px)",
                  },
                }}>
                  <Typography sx={{ fontSize: "16px" }}>{icon}</Typography>
                  <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>{label}</Typography>
                </Box>
              ))}
            </Box>

            {/* Stats Row */}
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              mt: 8,
              width: "100%",
              maxWidth: 480,
            }}>
              {[
                { n: "98%", l: "رضا المرضى" },
                { n: "500+", l: "طبيب متخصص" },
                { n: "24/7", l: "دعم مستمر" },
              ].map(({ n, l }) => (
                <Box key={l} sx={{
                  background: "#fff",
                  border: "1px solid #E8ECF2",
                  borderRadius: "14px",
                  py: 2.5, px: 2,
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }}>
                  <Typography sx={{
                    fontWeight: 700,
                    fontSize: "26px",
                    color: "#0A84FF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}>{n}</Typography>
                  <Typography sx={{ fontSize: "12px", color: "#8A95A3", mt: 0.5, fontWeight: 500 }}>{l}</Typography>
                </Box>
              ))}
            </Box>

            {/* Footer note */}
            <Typography sx={{ mt: 10, fontSize: "12px", color: "#B0BAC6" }}>
              © 2025 MediCore · نظام إدارة طبية · جميع الحقوق محفوظة
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}