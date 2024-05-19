import "./Koszyk.css";
import { Link } from "react-router-dom";

// Define an interface for the props
interface KoszykProps {
  zarezerwowaneMiejsca: number[];
  cenaBiletu: number;
}

function Koszyk({ zarezerwowaneMiejsca, cenaBiletu }: KoszykProps) {
  return (
    <div className="koszyk">
      <h1>Twój koszyk</h1>
      <div className="info">
        <h2>Liczba zarezerwowanych miejsc: {zarezerwowaneMiejsca.length}</h2>
        <h2>Zarezerwowane miejsca:</h2>
        <ul className="koszyk-selected-seats">
          {zarezerwowaneMiejsca.map((miejsce, index) => (
            <li key={index}>Miejsce {miejsce}</li> // Changed key to index for better uniqueness
          ))}
        </ul>
        <h2>Końcowa cena biletu: {cenaBiletu} zł</h2>
      </div>
      <Link to="/potwierdzenie" className="confirm-link">
        Potwierdź i zapłać
      </Link>
    </div>
  );
}

export default Koszyk;
