import React, { useEffect, useState } from "react";
import "./Hall.css";

interface Seat {
  seatId: number;
  row: number;
  column: number;
  isReserved: boolean;
}

interface Hall {
  hallId: number;
  seats: Seat[];
}

interface AddTicketDTO {
  seatId: number;
  scheduleId: number;
  price: number;
}

const API_URL = "https://localhost:7204/api";

const fetchSeats = async (hallId: number): Promise<Hall> => {
  const response = await fetch(`${API_URL}/hall/${hallId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch seats");
  }
  return response.json();
};

const reserveSeat = async (
  data: AddTicketDTO,
  token: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/Ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to reserve seat");
  }
};

const Hall: React.FC = () => {
  const [hall, setHall] = useState<Hall | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hallId = 1;

  useEffect(() => {
    const getSeats = async () => {
      try {
        const hallData = await fetchSeats(hallId);
        setHall(hallData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSeats();
  }, [hallId]);

  const handleReserve = async (seat: Seat) => {
    const price = parseFloat(prompt("Podaj cenę biletu:") || "0");
    const token = localStorage.getItem("token"); // Zakladam, ze token jest przechowywany w localStorage

    if (!token) {
      alert("Musisz być zalogowany, aby zarezerwować miejsce.");
      return;
    }

    const data = {
      seatId: seat.seatId,
      scheduleId: 1, // Ustal odpowiedni scheduleId
      price,
    };

    try {
      await reserveSeat(data, token);
      if (hall) {
        setHall({
          ...hall,
          seats: hall.seats.map((s) =>
            s.seatId === seat.seatId ? { ...s, isReserved: true } : s,
          ),
        });
      }
    } catch (error) {
      console.error(error);
      alert("Rezerwacja nie powiodła się.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rezerwacja miejsc w kinie</h1>
      </header>
      <main>
        <div className="sala">
          {hall?.seats.map((seat) => (
            <div
              key={seat.seatId}
              className={`miejsce${seat.isReserved ? " zarezerwowane" : ""}`}
              onClick={() => !seat.isReserved && handleReserve(seat)}
            >
              {seat.row}-{seat.column}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hall;
