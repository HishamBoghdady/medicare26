import {AppBar,Toolbar,Typography,Button,Box,Container,Grid,Card,CardContent,} from "../components/Lib/MuiComponents";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ background: "#0d6efd" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            MediCare Systemmm
          </Typography>
          <Box>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Features</Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 12,
          background: "linear-gradient(to right, #0d6efd, #20c997)",
          color: "white",
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Smart Medical Management System
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Manage patients, appointments, sessions and financial records
            efficiently.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#0d6efd",
              fontWeight: "bold",
              px: 4,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            System Features
          </Typography>

          <Grid container spacing={4} mt={4} justifyContent="center">
            {[
              {
                title: "Patient Management",
                desc: "Add, update and track patient history securely.",
              },
              {
                title: "Session Tracking",
                desc: "Monitor sessions and treatment progress easily.",
              },
              {
                title: "Financial Reports",
                desc: "Track payments and generate detailed reports.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Roles Section */}
      {/* <Box sx={{ py: 8, backgroundColor: "#e9f2ff" }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            System Roles
          </Typography>

          <Grid container spacing={4} mt={4} justifyContent="center">
            {["Admin", "Doctor", "Reception"].map((role, index) => (
              <Grid item key={index}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0d6efd",
                    px: 5,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  {role}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

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

export default IntroPage;
