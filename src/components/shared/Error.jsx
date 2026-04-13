import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
} from "../Lib/MuiComponents";
import { useNavigate } from "react-router-dom";

const Error = () => {
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

      {/* Classic Center Card */}
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
              borderTop: "6px solid #ff0000",
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: "#0d6efd" }}
              gutterBottom
            >
              404
            </Typography>

            <Typography variant="h5" gutterBottom>
              Page Not Found
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
              The page you are looking for might have been removed,
              renamed, or is temporarily unavailable.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0d6efd",
                px: 4,
                "&:hover": { backgroundColor: "#0b5ed7" },
              }}
              onClick={() => navigate("/")}
            >
              Go Back Home
            </Button>
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

export default Error;

