import { useState } from "react";
import Miejsce from "./Miejsce"; // Ensure Miejsce is also converted to TSX with proper typings
import { Link } from "react-router-dom";
import "./SalaKinowa.css"; // Make sure this is correctly linked

interface SalaKinowaProps {
  iloscMiejsc: number;
  onPotwierdzRezerwacje: (zarezerwowaneMiejsca: number[]) => void; // Assuming the callback takes an array of numbers
}

function SalaKinowa({ iloscMiejsc, onPotwierdzRezerwacje }: SalaKinowaProps) {
  const [zarezerwowaneMiejsca, setZarezerwowaneMiejsca] = useState<number[]>(
    [],
  );
  const [potwierdzoneMiejsca, setPotwierdzoneMiejsca] = useState<number[]>([]);
  const [rezerwacjaPotwierdzona, setRezerwacjaPotwierdzona] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleMiejsceClick = (miejsce: number) => {
    if (!rezerwacjaPotwierdzona) {
      const updatedZarezerwowane = zarezerwowaneMiejsca.includes(miejsce)
        ? zarezerwowaneMiejsca.filter((m) => m !== miejsce)
        : [...zarezerwowaneMiejsca, miejsce];
      setZarezerwowaneMiejsca(updatedZarezerwowane);
    }
  };

  const handlePotwierdzRezerwacje = () => {
    if (zarezerwowaneMiejsca.length === 0) {
      setShowModal(true);
    } else {
      setPotwierdzoneMiejsca(zarezerwowaneMiejsca);
      setRezerwacjaPotwierdzona(true);
      onPotwierdzRezerwacje(zarezerwowaneMiejsca);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="sala-kinowa">
      <div className="screen">EKRAN</div>
      <div className="cinema-layout">
        <div className="seats-area">
          <div className="seats">
            {Array.from({ length: iloscMiejsc }, (_, index) => (
              <Miejsce
                key={index}
                numer={index + 1}
                zarezerwowane={zarezerwowaneMiejsca.includes(index + 1)}
                potwierdzone={potwierdzoneMiejsca.includes(index + 1)}
                handleClick={handleMiejsceClick}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="control-area">
        <div className="selected-seats">
          {zarezerwowaneMiejsca.length > 0 ? (
            <>
              <h2>Wybrane miejsca:</h2>
              <ul>
                {zarezerwowaneMiejsca.map((miejsce) => (
                  <li key={miejsce}>Miejsce {miejsce}</li>
                ))}
              </ul>
            </>
          ) : (
            <h2>Brak wybranych miejsc</h2>
          )}
        </div>
        {!rezerwacjaPotwierdzona && (
          <button
            className="confirm-button"
            onClick={handlePotwierdzRezerwacje}
          >
            <Link to="/koszyk">Potwierdź rezerwację</Link>
          </button>
        )}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close-btn" onClick={handleCloseModal}>
                &times;
              </button>
              <p>Żadne miejsce nie zostało wybrane</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalaKinowa;
