import { Link } from "react-router-dom";
import "./NewNavbar.css";
import PriceList from "../PriceList/PriceList.tsx";

interface Props {
  isModalOpen: boolean;
  hideModal: () => void;
  onButtonClick: () => void;
}

function NewNavbar({ isModalOpen, hideModal, onButtonClick }: Props) {
  return (
    <div>
      <PriceList isOpen={isModalOpen} onClose={hideModal} />
      <nav className="nav">
        <Link to="/" className="site-title">
          Moje Kino
        </Link>
        <ul>
          <li>
            <Link to="/repertuar">Repertuar</Link>
          </li>
          <li>
            <a onClick={onButtonClick} className="price-list-button">
              Cennik
            </a>
          </li>
          <li>
            <Link to="/login">Konto</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NewNavbar;
