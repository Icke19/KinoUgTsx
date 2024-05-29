import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">MojeKino</h2>
        <div className="footer-content">
          <div className="team-info">
            <h3>Zespół: Twardziele</h3>
            <ul>
              <li>Patryk Sękielewski</li>
              <li>Igor Puścikowski</li>
              <li>Kuba Karolewicz</li>
              <li>Cezary Sawicki</li>
            </ul>
          </div>
          <div className="office-info">
            <h3>Adres Biura</h3>
            <p>23 Marca 11A, 81-808 Sopot</p>
          </div>
          <div className="contact">
            <h3>Informacje Kontaktowe</h3>
            <p>czarekpl5053@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
