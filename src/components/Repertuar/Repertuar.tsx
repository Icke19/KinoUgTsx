import "./Repertuar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface MinSchedule {
  id: number;
  date: Date;
  movieTitle: string;
  image: string;
}

const fetchScheduleList = async () => {
  try {
    const response = await axios.get<MinSchedule[]>(
      `https://localhost:7204/api/Schedule/all`,
    );
    console.log("Fetched movies:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

function Repertuar() {
  const [scheduleList, setScheduleList] = useState<MinSchedule[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const scheduleListFromBackend = await fetchScheduleList();
      setScheduleList(scheduleListFromBackend);
    };
    fetchSchedule();
  }, []);
  return (
    <div className="repertuar">
      {scheduleList.map((schedule, index) => (
        <div key={index} className="movie">
          <img
            src={schedule.image}
            alt={schedule.movieTitle}
            className="movie-image"
          />
          <div className="movie-details">
            <h2>{schedule.movieTitle}</h2>
            <p>{schedule.movieTitle}</p>
            <ul>
              <li className="buy-ticket">
                <Link to="/salakinowa">Buy Ticket</Link>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Repertuar;
