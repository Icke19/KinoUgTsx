import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManageUsers.css";
import { useTheme } from "../../ThemeContext";

interface Ticket {
  id: string;
  price: number;
  seatId: number;
  scheduleId: number;
}

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  userTickets?: Ticket[]; // Make userTickets optional
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7204/api/User/GetUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (email: string) => {
    try {
      await axios.delete(`https://localhost:7204/api/User/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className={`manage-users-container ${isDarkMode ? "dark" : "light"}`}>
      <h1>Manage Users</h1>
      <ul className="manage-users-list">
        {users.map((user) => (
          <li key={user.id} className={isDarkMode ? "dark" : "light"}>
            <h3>
              {user.name} {user.surname}
            </h3>
            <p>{user.email}</p>
            <button onClick={() => deleteUser(user.email)}>Delete</button>
            <h4>Tickets:</h4>
            <ul>
              {(user.userTickets ?? []).map((ticket) => (
                <li key={ticket.id}>
                  Seat: {ticket.seatId}, Schedule: {ticket.scheduleId}, Price: $
                  {ticket.price}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button className="back-button" onClick={() => navigate("/profil")}>
        Back to Profile
      </button>
    </div>
  );
};

export default ManageUsers;
