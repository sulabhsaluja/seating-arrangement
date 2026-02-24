import { useEffect, useState } from "react";
import API from "../api/api";

const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new Date(date).toDateString() === tomorrow.toDateString();
};

const SeatGrid = ({ selectedDate }) => {
  const [seats, setSeats] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSeats = async () => {
      const res = await API.get("/seats");
      setSeats(res.data);
    };
    fetchSeats();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookings = async () => {
      const res = await API.get(`/bookings/${selectedDate}`);
      setBookings(res.data);
    };
    fetchBookings();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedDate) {
      setMessage("Please select a date.");
      return;
    }

    if (!isTomorrow(selectedDate)) {
      setMessage("Booking allowed only for tomorrow.");
      return;
    }

    try {
      await API.post("/bookings", { date: selectedDate });

      setMessage("Seat booked successfully.");

      const res = await API.get(`/bookings/${selectedDate}`);
      setBookings(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <>
      {message && (
        <div style={styles.message}>{message}</div>
      )}

      <div style={styles.grid}>
        {seats.map((seat) => {
          const isBooked = bookings.some(
            (b) => b.seatNumber === seat.seatNumber
          );

          return (
            <div
              key={seat._id}
              onClick={() => !isBooked && handleBooking()}
              style={{
                ...styles.seat,
                background: isBooked
                  ? "linear-gradient(135deg,#ef4444,#dc2626)"
                  : seat.type === "FLOATER"
                  ? "linear-gradient(135deg,#facc15,#f59e0b)"
                  : "linear-gradient(135deg,#22c55e,#16a34a)",
                cursor: isBooked ? "not-allowed" : "pointer",
                opacity: isBooked ? 0.7 : 1
              }}
            >
              {seat.seatNumber}
            </div>
          );
        })}
      </div>
    </>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gap: "14px"
  },
  seat: {
    padding: "22px",
    borderRadius: "12px",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    transition: "0.2s ease"
  },
  message: {
    marginBottom: "15px",
    padding: "10px",
    background: "#e0f2fe",
    borderRadius: "8px"
  }
};

export default SeatGrid;