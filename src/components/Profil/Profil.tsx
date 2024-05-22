import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import
import "./Profil.css";

interface UserProfile {
  name: string;
  surname: string;
  email: string;
}

interface Ticket {
  id: number;
  row: number;
  column: number;
  hallId: number;
  date: string;
  movieTitle: string;
  userId: string;
}

interface TokenPayload {
  nameid: string;
  email: string;
  name: string;
  family_name: string;
  unique_name: string;
}

function Profil() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://localhost:7204/api/User/GetCurrentUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login");
      }
    };

    const fetchUserTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode<TokenPayload>(token);
        const userIdFromToken = decodedToken.nameid;

        const response = await axios.get(
          "https://localhost:7204/api/Ticket/GetTicket",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Filter tickets to only include those with the same user ID
        const userTickets = response.data.filter(
          (ticket: Ticket) => ticket.userId === userIdFromToken,
        );
        setTickets(userTickets);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
      }
    };

    fetchUserProfile();
    fetchUserTickets();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 style={{ color: "white" }}>Profil Użytkownika</h1>
      <div className="profile-info">
        <p>
          <strong>Imię:</strong> {user.name}
        </p>
        <p>
          <strong>Nazwisko:</strong> {user.surname}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="tickets-container">
        <h2>Twoje bilety:</h2>
        {tickets.length > 0 ? (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <p>
                  <strong>Film:</strong> {ticket.movieTitle}
                </p>
                <p>
                  <strong>Data:</strong> {ticket.date}
                </p>
                <p>
                  <strong>Rząd:</strong> {ticket.row}, <strong>Miejsce:</strong>{" "}
                  {ticket.column}
                </p>
                <p>
                  <strong>Hala:</strong> {ticket.hallId}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak zakupionych biletów.</p>
        )}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Wyloguj się
      </button>
    </div>
  );
}

export default Profil;
