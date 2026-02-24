import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <h2 style={{ margin: 0 }}>Hybrid Workspace</h2>
        <span style={styles.subtitle}>
          Smart Seat Allocation System
        </span>
      </div>

      <button
        style={styles.button}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    background: "#111827",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
  },
  left: {
    display: "flex",
    flexDirection: "column"
  },
  subtitle: {
    fontSize: "12px",
    opacity: 0.7
  },
  button: {
    padding: "8px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    transition: "0.3s ease"
  }
};

export default Navbar;