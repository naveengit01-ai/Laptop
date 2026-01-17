
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function Payments() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { seats = [], totalPrice = 0 } = state || {};

  const [showQR, setShowQR] = useState(false);
  const [allowDownload, setAllowDownload] = useState(false);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Movie Ticket Confirmation", 20, 20);
    doc.setFontSize(14);
    doc.text(`Seats: ${seats.join(", ")}`, 20, 40);
    doc.text(`Total Price: ₹${totalPrice}`, 20, 50);
    doc.text("Enjoy your show!", 20, 70);
    doc.save("ticket.pdf");
  };

  const handlePayment = () => {
    setShowQR(true);
    setAllowDownload(false);

    // Show download button after 10 seconds
    setTimeout(() => {
      setAllowDownload(true);
    }, 10000);
  };

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No booking found</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "crimson",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Payment Summary</h2>
      <p>
        <strong>Seats:</strong> {seats.join(", ")}
      </p>
      <p>
        <strong>Total Price:</strong> ₹{totalPrice}
      </p>

      {!showQR ? (
        <button
          onClick={handlePayment}
          style={{
            padding: "12px 25px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Pay Now
        </button>
      ) : (
        <div>
          <div style={{ marginTop: "20px" }}>
            <h4>Scan QR to Pay</h4>
            <img
              src="/images/qr.png"
              alt="Payment QR"
              style={{ width: "200px", height: "200px", marginTop: "10px" }}
            />
          </div>

          {allowDownload && (
            <button
              onClick={downloadPDF}
              style={{
                padding: "10px 20px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Download Ticket (PDF)
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Payments;


