import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    squad: "",
    batch: "BATCH_1",
    designatedSeat: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        ...form,
        squad: Number(form.squad),
        designatedSeat: Number(form.designatedSeat)
      });

      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>
          Register to access the workspace
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="squad"
            type="number"
            min="1"
            max="10"
            placeholder="Squad (1-10)"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="batch"
            onChange={handleChange}
            value={form.batch}
            style={styles.select}
          >
            <option value="BATCH_1">Batch 1</option>
            <option value="BATCH_2">Batch 2</option>
          </select>

          <input
            name="designatedSeat"
            type="number"
            min="1"
            max="40"
            placeholder="Designated Seat (1-40)"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Create Account
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login
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
    width: "420px",
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
    marginBottom: "6px"
  },
  subtitle: {
    marginBottom: "25px",
    opacity: 0.7,
    fontSize: "14px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "white",
    outline: "none"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    outline: "none"
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background:
      "linear-gradient(90deg, #2563eb, #1e40af)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s ease"
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    opacity: 0.8
  },
  link: {
    color: "#60a5fa",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default Signup;