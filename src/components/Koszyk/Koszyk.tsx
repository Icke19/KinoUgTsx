import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Koszyk.css";

interface State {
  selectedSeats: number[];
  scheduleId: string;
}

const Koszyk: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as State;
  const { selectedSeats, scheduleId } = state;

  const handleConfirmPurchase = async () => {
    try {
      await Promise.all(
        selectedSeats.map((seatId: number) =>
          axios.post(
            "https://localhost:7204/api/Ticket",
            {
              seatId,
              scheduleId: Number(scheduleId),
              price: 50, // przykładowa cena
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          ),
        ),
      );
      alert("Zakupiono bilety!");
      navigate("/salakinowa/" + scheduleId, { state: { reload: true } });
    } catch (error) {
      console.error("Error purchasing tickets:", error);
      alert("Wystąpił błąd podczas zakupu biletów.");
    }
  };

  return (
    <div className="koszyk">
      <h2>Koszyk</h2>
      <p>Wybrane miejsca: {selectedSeats.join(", ")}</p>
      <button onClick={handleConfirmPurchase}>Potwierdź zakup</button>
    </div>
  );
};

export default Koszyk;
