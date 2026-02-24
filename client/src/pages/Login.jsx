import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your workspace</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder=" "
            />
            <label style={styles.label}>Email</label>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder=" "
            />
            <label style={styles.label}>Password</label>
          </div>

          <button
            style={styles.button}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/signup")}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #141e30, #243b55)"
  },
  card: {
    width: "380px",
    padding: "40px",
    borderRadius: "18px",
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
    color: "white"
  },
  title: {
    margin: 0,
    marginBottom: "5px"
  },
  subtitle: {
    marginBottom: "30px",
    opacity: 0.7,
    fontSize: "14px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "22px"
  },
  inputGroup: {
    position: "relative"
  },
  input: {
    width: "100%",
    padding: "12px 10px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "white",
    outline: "none"
  },
  label: {
    position: "absolute",
    top: "-8px",
    left: "10px",
    fontSize: "12px",
    background: "rgba(20,30,48,0.9)",
    padding: "0 6px",
    borderRadius: "4px",
    opacity: 0.8
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #1e40af)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s ease"
  },
  footer: {
    marginTop: "25px",
    fontSize: "14px",
    opacity: 0.8
  },
  link: {
    color: "#60a5fa",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default Login;