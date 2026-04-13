import { useState, useEffect } from "react";

const styles = {
  root: {
    fontFamily: "'Cairo', 'Roboto', sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    direction: "rtl",
  },
  appbar: {
    background: "#d32f2f",
    color: "white",
    height: 64,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    position: "sticky",
    top: 0,
    zIndex: 1100,
    gap: 16,
  },
  appbarTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    letterSpacing: "0.0075em",
  },
  menuIcon: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    cursor: "pointer",
    padding: 4,
  },
  menuBar: {
    display: "block",
    width: 24,
    height: 2,
    background: "white",
    borderRadius: 2,
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
  },
  paper: {
    background: "#ffffff",
    borderRadius: 8,
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    padding: "64px 48px",
    maxWidth: 560,
    width: "100%",
    textAlign: "center",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 12px",
    background: "rgba(211,47,47,0.08)",
    color: "#d32f2f",
    borderRadius: 16,
    fontSize: "0.8125rem",
    fontWeight: 600,
    marginBottom: 16,
  },
  chipDot: {
    width: 8,
    height: 8,
    background: "#d32f2f",
    borderRadius: "50%",
  },
  errorCode: {
    fontSize: "6rem",
    fontWeight: 700,
    lineHeight: 1,
    background: "linear-gradient(135deg, #d32f2f 0%, #ff6f00 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    background: "rgba(0,0,0,0.12)",
    margin: "24px 0",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "rgba(0,0,0,0.87)",
    marginBottom: 12,
    letterSpacing: "0.0075em",
  },
  subtext: {
    fontSize: "1rem",
    color: "rgba(0,0,0,0.6)",
    lineHeight: 1.75,
    marginBottom: 32,
  },
  btnGroup: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnContained: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "8px 22px",
    borderRadius: 4,
    fontFamily: "inherit",
    fontSize: "0.9375rem",
    fontWeight: 600,
    letterSpacing: "0.02857em",
    cursor: "pointer",
    border: "none",
    outline: "none",
    height: 42,
    background: "#d32f2f",
    color: "white",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    transition: "background-color 250ms cubic-bezier(0.4,0,0.2,1), box-shadow 250ms",
  },
  btnOutlined: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "8px 22px",
    borderRadius: 4,
    fontFamily: "inherit",
    fontSize: "0.9375rem",
    fontWeight: 600,
    letterSpacing: "0.02857em",
    cursor: "pointer",
    background: "transparent",
    color: "#d32f2f",
    border: "1px solid rgba(211,47,47,0.5)",
    height: 42,
    transition: "background-color 250ms cubic-bezier(0.4,0,0.2,1), border-color 250ms",
  },
  alert: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    background: "rgba(211,47,47,0.06)",
    border: "1px solid rgba(211,47,47,0.2)",
    borderRadius: 4,
    padding: "12px 16px",
    marginBottom: 28,
    textAlign: "right",
  },
  alertText: {
    fontSize: "0.875rem",
    color: "#c62828",
    lineHeight: 1.6,
  },
  footer: {
    textAlign: "center",
    padding: 16,
    fontSize: "0.75rem",
    color: "rgba(0,0,0,0.6)",
  },
};

// Lock SVG Illustration
function LockIllustration() {
  return (
    <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="rgba(211,47,47,0.05)" stroke="rgba(211,47,47,0.15)" strokeWidth="2" />
      {/* Lock body */}
      <rect x="62" y="95" width="76" height="62" rx="6" fill="white" stroke="#e0e0e0" strokeWidth="1.5" />
      <rect x="62" y="95" width="76" height="62" rx="6" fill="rgba(211,47,47,0.07)" />
      {/* Lock shackle */}
      <path
        d="M75 95 V75 Q75 55 100 55 Q125 55 125 75 V95"
        stroke="#d32f2f"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Keyhole */}
      <circle cx="100" cy="122" r="10" fill="white" stroke="#d32f2f" strokeWidth="2" />
      <rect x="96" y="126" width="8" height="14" rx="2" fill="#d32f2f" />
      {/* Alert dots */}
      <circle cx="36" cy="65" r="5" fill="rgba(211,47,47,0.18)" />
      <circle cx="165" cy="140" r="4" fill="rgba(255,111,0,0.2)" />
      <circle cx="158" cy="55" r="6" fill="rgba(211,47,47,0.12)" />
    </svg>
  );
}

export default function Unauthorized() {
  const [dotVisible, setDotVisible] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    const blink = setInterval(() => setDotVisible((v) => !v), 750);
    return () => { clearTimeout(timer); clearInterval(blink); };
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
      <div style={styles.root}>
        {/* AppBar */}
        <header style={styles.appbar}>
          <div style={styles.menuIcon}>
            <span style={styles.menuBar} />
            <span style={styles.menuBar} />
            <span style={styles.menuBar} />
          </div>
          <span style={styles.appbarTitle}>تطبيقي</span>
        </header>

        {/* Main */}
        <main style={styles.main}>
          <div
            style={{
              ...styles.paper,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Illustration */}
            <div style={{ marginBottom: 28 }}>
              <LockIllustration />
            </div>

            {/* Chip */}
            <div style={styles.chip}>
              <span
                style={{
                  ...styles.chipDot,
                  opacity: dotVisible ? 1 : 0.25,
                  transition: "opacity 0.3s",
                }}
              />
              وصول مرفوض
            </div>

            {/* Error Code */}
            <div style={styles.errorCode}>401</div>

            <div style={styles.divider} />

            {/* Heading */}
            <h1 style={styles.heading}>غير مصرح بالوصول</h1>
            <p style={styles.subtext}>
              ليس لديك صلاحية للوصول إلى هذه الصفحة.
              يرجى تسجيل الدخول أو التواصل مع المسؤول للحصول على الأذونات اللازمة.
            </p>

            {/* Alert */}
            <div style={styles.alert}>
              <span style={{ fontSize: "1.1rem" }}>⚠️</span>
              <p style={styles.alertText}>
                إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع فريق الدعم الفني وتزويدهم برمز الخطأ <strong>401</strong>.
              </p>
            </div>

            {/* Buttons */}
            <div style={styles.btnGroup}>
              <button
                style={styles.btnContained}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b71c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#d32f2f")}
                onClick={() => alert("انتقال إلى صفحة تسجيل الدخول...")}
              >
                🔑 تسجيل الدخول
              </button>
              <button
                style={styles.btnOutlined}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(211,47,47,0.05)";
                  e.currentTarget.style.borderColor = "#d32f2f";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(211,47,47,0.5)";
                }}
                onClick={() => history.back()}
              >
                ← رجوع
              </button>
            </div>
          </div>
        </main>

        <footer style={styles.footer}>
          &copy; 2024 تطبيقي — جميع الحقوق محفوظة
        </footer>
      </div>
    </>
  );
}
