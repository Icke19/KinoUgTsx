import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Profil.css";

interface UserProfile {
  name: string;
  surname: string;
  email: string;
}

interface Ticket {
  id: number;
  row: number;
  seatId: number;
  hallId: number;
  date: string;
  movieTitle: string;
  userId: string;
  scheduleId: number; // Assuming each ticket has a scheduleId field
}

interface TokenPayload {
  nameid: string;
  email: string;
  name: string;
  family_name: string;
  unique_name: string;
}

interface Movie {
  title: string;
  image: string | null;
}

interface Schedule {
  id: number;
  movie: Movie;
}

function Profil() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tickets, setTickets] = useState<(Ticket & { movie: Movie | null })[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

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

        const userTickets = response.data.filter(
          (ticket: Ticket) => ticket.userId === userIdFromToken,
        );

        const ticketsWithMovies = await Promise.all(
          userTickets.map(async (ticket: Ticket) => {
            const scheduleResponse = await axios.get(
              `https://localhost:7204/api/Schedule/${ticket.scheduleId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            const schedule: Schedule = scheduleResponse.data;
            return { ...ticket, movie: schedule.movie };
          }),
        );

        setTickets(ticketsWithMovies);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
      } finally {
        setLoading(false);
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
        {loading ? (
          <p>Loading...</p>
        ) : tickets.length > 0 ? (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                {ticket.movie && (
                  <>
                    <p>
                      <strong>Film:</strong> {ticket.movie.title}
                    </p>
                    {ticket.movie.image ? (
                      <img
                        src={ticket.movie.image}
                        alt={ticket.movie.title}
                        width="100"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </>
                )}
                <p>
                  <strong>Data:</strong> {ticket.date}
                </p>
                <p>
                  <strong>Miejsce:</strong> {ticket.seatId}
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
