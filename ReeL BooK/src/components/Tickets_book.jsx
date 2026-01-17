import { useState } from "react";
import "../CSS/Tickets_book.css";
import { useNavigate } from "react-router-dom";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const cols = Array.from({ length: 25 }, (_, i) => i + 1);

const getSeatPrice = (row) => {
  if (["A", "B", "C", "D"].includes(row)) return 100;
  if (["E", "F", "G", "H"].includes(row)) return 200;
  if (["I", "J"].includes(row)) return 500;
  return 0;
};

export default function Tickets_book() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleSeat = (seat) => {
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const totalPrice = selected.reduce((acc, seat) => {
    const row = seat[0];
    return acc + getSeatPrice(row);
  }, 0);

  const handleProceed = () => {
    // Navigate to Payments page with state
    navigate("/payment", { state: { seats: selected, totalPrice } });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <hr className="hr" />
        <p>🎬 Screen this side</p>
      </div>

      {rows.map((r) => (
        <div key={r} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ width: "80px", fontWeight: "bold", color: "darkred" }}>
            ₹{getSeatPrice(r)}
          </div>

          {cols.map((c) => {
            const seat = `${r}${c}`;
            return (
              <button
                key={seat}
                onClick={() => toggleSeat(seat)}
                style={{
                  margin: "3px",
                  padding: "10px",
                  backgroundColor: selected.includes(seat) ? "blue" : "lightgreen",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {seat}
              </button>
            );
          })}
        </div>
      ))}

      <h3>Selected Seats: {selected.join(", ") || "None"}</h3>
      <h3>Total Price: ₹{totalPrice}</h3>

      {selected.length > 0 && (
        <button
          onClick={handleProceed}
          style={{
            padding: "10px 20px",
            backgroundColor: "crimson",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "15px",
          }}
        >
          Proceed to Pay
        </button>
      )}
    </div>
  );
}

