interface MiejsceProps {
  numer: number;
  zarezerwowane: boolean;
  potwierdzone: boolean;
  handleClick: (numer: number) => void; // Assuming handleClick is a function that takes a number and returns void
}

const Miejsce = ({
  numer,
  zarezerwowane,
  potwierdzone,
  handleClick,
}: MiejsceProps) => {
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
