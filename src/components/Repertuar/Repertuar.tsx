import "./Repertuar.css";
import { Link } from "react-router-dom";

function Repertuar() {
  const movies = [
    {
      title: "Kaskader",
      image: "public/newfilms/avatar.jpg",
      description:
        "A thrilling comedy about a daring stuntman who accidentally becomes a star in Hollywood.",
    },
    {
      title: "Gniazdo pajaka",
      image: "public/newfilms/chlopi.jpg",
      description:
        "A chilling tale of a family moving into a haunted house that hides dark secrets.",
    },
  ];

  return (
    <div className="repertuar">
      {movies.map((movie, index) => (
        <div key={index} className="movie">
          <img src={movie.image} alt={movie.title} className="movie-image" />
          <div className="movie-details">
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
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
