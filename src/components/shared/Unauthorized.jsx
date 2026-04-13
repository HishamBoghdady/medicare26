import {AppBar,Toolbar,Typography,Button,Box,Container,Paper,} from "../Lib/MuiComponents";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#0d6efd" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            MediCare System
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Center Card */}
      <Box
        sx={{
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f8fb",
          py: 6,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={4}
            sx={{
              p: 6,
              textAlign: "center",
              borderTop: "6px solid #ff6600cb",
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: "#0d6efd" }}
              gutterBottom
            >
              403
            </Typography>

            <Typography variant="h5" gutterBottom>
              Access Denied
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
              You do not have permission to access this page.
              Please contact the system administrator if needed.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0d6efd",
                  "&:hover": { backgroundColor: "#0b5ed7" },
                }}
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#20c997",
                  color: "#20c997",
                  "&:hover": {
                    borderColor: "#1aa179",
                    backgroundColor: "rgba(32,201,151,0.08)",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          backgroundColor: "#0d6efd",
          color: "white",
        }}
      >
        <Typography>
          © 2026 MediCare System - All Rights Reserved
        </Typography>
      </Box>
    </>
  );
};

export default Unauthorized;
