import { useState } from "react";
import { useNavigate } from "react-router-dom"

import useTheme from "../context/ThemeMode/useTheme";
import useAuth from "../context/auth/useAuth"

import {Box,Paper,TextField,Typography,Button,Checkbox,FormControlLabel,IconButton,InputAdornment,} from "../components/Lib/MuiComponents";
import {LoginIcon,Visibility,VisibilityOff,Brightness4Icon,Brightness7Icon,} from "../components/Lib/MuiIcon";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme();
  const [showPass, setShowPass] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const profile = {
    id: "",
    username: values.email.split("@")[0],
    fullName: "",
    email: values.email,
    role: "",
    permissions: [],
    token: "",
    avatarUrl: "",
    language: ""
  }
  const [errors, setErrors] = useState({});



  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({ ...errors, [prop]: "" });
  };

  const handleRememberChange = (event) => {
    setValues({ ...values, remember: event.target.checked });
  };

  const validate = () => {
    const e = {};
    if (!values.email) {
      e.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      e.email = "البريد الإلكتروني غير صحيح";
    }
    if (!values.password) {
      e.password = "كلمة المرور مطلوبة";
    } else if (values.password.length < 6) {
      e.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };


  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      await login(values.email, values.password);
      alert("✅ Login successful!");
      localStorage.setItem("user", JSON.stringify(profile));
      navigate("/dashboard")
    } catch (err) {
      alert("❌ Invalid username or password" + err);
      //   setLogin(false)
      navigate("/")
    }
  };
  return (
    <>

      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "0.3s",
          p: { xs: 2, sm: 3, md: 5 },
          background: darkMode ? "#1e293b" : "#f5f5f5",
          color: darkMode ? "#ffffff" : "#000000",

          "& .MuiFormLabel-root": { color: darkMode ? "#e2e8f0" : "#555" },
          "& .MuiInputBase-input": { color: darkMode ? "#ffffff" : "#000000" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: darkMode ? "#94a3b8" : "#cbd5e1" },
          "& .MuiSvgIcon-root": { color: darkMode ? "#ffffff" : "#000000" },
        }}
      >
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxWidth: { xs: "100%", sm: 600, md: 900 },
            borderRadius: { xs: 2, md: 4 },
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          {/* RIGHT SIDE — BLUE BANNER */}
          <Box
            sx={{
              flex: 1,
              background: darkMode ? "#0f172a" : "#0d47a1",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: { xs: 3, md: 4 },
              borderTopRightRadius: { md: 16, xs: 16 },
              borderBottomRightRadius: { md: 16, xs: 0 },
              borderTopLeftRadius: { xs: 0, md: 0 },
              minHeight: { xs: 200, md: "auto" },
            }}
          >
            <img src={"./d.png"} alt="logo" style={{ width: "100%", maxWidth: 240, marginBottom: 20, borderRadius: "10px" }} />
            <Typography variant="h5" fontWeight="bold" mb={1} sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
              Be Verified
            </Typography>

            <Typography sx={{ maxWidth: 300, textAlign: "center", fontSize: { xs: "0.875rem", md: "1rem" } }}>
              Join experienced Designers on this platform.
            </Typography>
          </Box>

          {/* LEFT SIDE — FORM */}
          <Box component="form" onSubmit={handleSubmit}
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
              background: darkMode ? "#1e293b" : "#ffffff",
              display: "flex",
              flexDirection: "column",
            }} >

            {/* Toggle Dark Mode */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <IconButton onClick={toggleDarkMode} size="small">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>

            <Typography variant="h5" fontWeight="bold" mb={1} sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
              Hello, Again
            </Typography>
            <Typography color="text.secondary" mb={4}> We are happy to have you back.</Typography>

            {/* Email */}
            <TextField fullWidth label="Email address" margin="normal" size="small" type="email"
              value={values.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
            />

            {/* Password */}
            <TextField fullWidth label="Password" margin="normal" size="small"
              type={showPass ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" size="small"
                      onClick={() => setShowPass(!showPass)}>
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="body2" color="primary"
              sx={{
                mt: 1, cursor: "pointer", textAlign: "right",
                "&:hover": { textDecoration: "underline" },
              }}>
              Forgot Password?
            </Typography>

            <FormControlLabel
              control={<Checkbox checked={values.remember} onChange={handleRememberChange} />}
              label="Remember Me"
              sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
            />

            {/* LOGIN BUTTON */}
            {/* <Link to='/dashboard'> */}
            <Button fullWidth variant="contained" endIcon={<LoginIcon />} type="submit"
              sx={{ mt: 3, borderRadius: 2, py: { xs: 1, md: 1.4 }, fontSize: { xs: 14, md: 16 }, }}>
              Login
            </Button>
            {/* </Link> */}
          </Box>
        </Paper>
      </Box>
    </>
  );
}



