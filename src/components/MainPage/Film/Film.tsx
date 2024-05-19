import "./Film.css";

// Interfaces are already defined appropriately for the types of data the component expects.
interface Film {
  id: number; // assuming id is a number
  name: string;
  src: string;
  alt: string;
}

interface Props {
  hits: Film[];
  upcoming: Film[];
}

export default function Film({ hits, upcoming }: Props) {
  return (
    <div className="FilmMenu">
      <h1 className="TextHit">NAJWIĘKSZE HITY!</h1>
      <ul className="films">
        {hits.map((film) => (
          <img src={film.src} alt={film.name} key={film.id} /> // Use unique id for key if available
        ))}
      </ul>
      <h1 className="TextHit">WKRÓTCE!</h1>
      <ul className="films">
        {upcoming.map((film) => (
          <img src={film.src} alt={film.name} key={film.id} /> // Use unique id for key if available
        ))}
      </ul>
    </div>
  );
}
