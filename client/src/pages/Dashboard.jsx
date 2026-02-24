import Navbar from "../components/Navbar";
import SeatGrid from "../components/SeatGrid";
import { useState, useEffect } from "react";
import API from "../api/api";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [seats, setSeats] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Fetch all seats once
  useEffect(() => {
    const fetchSeats = async () => {
      const res = await API.get("/seats");
      setSeats(res.data);
    };
    fetchSeats();
  }, []);

  // Fetch bookings when date changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookings = async () => {
      const res = await API.get(`/bookings/${selectedDate}`);
      setBookings(res.data);
    };

    fetchBookings();
  }, [selectedDate]);

  const handleLeave = async () => {
    if (!selectedDate) {
      setMessage("Select a date first.");
      return;
    }

    try {
      await API.post("/bookings/leave", { date: selectedDate });
      setMessage("Leave marked successfully.");

      const res = await API.get(`/bookings/${selectedDate}`);
      setBookings(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };

  const totalSeats = seats.length;
  const bookedSeats = bookings.length;
  const availableSeats = totalSeats - bookedSeats;

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.headerCard}>
          <div>
            <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
            <p style={{ opacity: 0.6 }}>
              Monitor seat utilization and bookings
            </p>
          </div>

          <div style={styles.controls}>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setMessage("");
              }}
              style={styles.dateInput}
            />

            <button style={styles.leaveBtn} onClick={handleLeave}>
              Mark Leave
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsWrapper}>
          <StatCard
            title="Total Seats"
            value={totalSeats}
            color="#2563eb"
          />
          <StatCard
            title="Booked Seats"
            value={bookedSeats}
            color="#ef4444"
          />
          <StatCard
            title="Available Seats"
            value={availableSeats}
            color="#16a34a"
          />
        </div>

        {message && (
          <div style={styles.message}>{message}</div>
        )}

        {/* Seat Grid */}
        <div style={styles.gridWrapper}>
          <SeatGrid selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

const StatCard = ({ title, value, color }) => (
  <div
    style={{
      ...styles.statCard,
      borderLeft: `6px solid ${color}`
    }}
  >
    <h4 style={{ margin: 0, opacity: 0.6 }}>{title}</h4>
    <h2 style={{ margin: "10px 0 0 0" }}>{value}</h2>
  </div>
);

const styles = {
  container: {
    padding: "40px 60px",
    background: "#f3f4f6",
    minHeight: "100vh"
  },
  headerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    marginBottom: "30px"
  },
  controls: {
    display: "flex",
    gap: "12px"
  },
  dateInput: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  leaveBtn: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer"
  },
  statsWrapper: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    flex: 1,
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
  },
  gridWrapper: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
  },
  message: {
    marginBottom: "15px",
    padding: "10px",
    background: "#e0f2fe",
    borderRadius: "6px"
  }
};

export default Dashboard;