const Miejsce = ({ numer, zarezerwowane, potwierdzone, handleClick }) => {
  // Determine the class based on the seat's status
  let seatClass = "seat";
  if (zarezerwowane) seatClass += " zarezerwowane";
  if (potwierdzone) seatClass += " potwierdzone";

  return (
    <div className={seatClass} onClick={() => handleClick(numer)}>
      {numer}
    </div>
  );
};

export default Miejsce;
