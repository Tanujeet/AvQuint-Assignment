import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>TaskManager</h1>
      <div style={styles.right}>
        <span style={styles.name}>👋 {user?.name}</span>
        <button style={styles.btn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#4f46e5",
    color: "#fff",
  },
  logo: { margin: 0, fontSize: "1.25rem" },
  right: { display: "flex", alignItems: "center", gap: "1rem" },
  name: { fontSize: "0.95rem" },
  btn: {
    padding: "0.4rem 1rem",
    background: "#fff",
    color: "#4f46e5",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
