import "./Film.css";
interface Film {
  src: string;
  name: string;
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
        {hits.map((film, idx) => (
          <img src={film.src} alt={film.name} key={idx} />
        ))}
      </ul>
      <h1 className="TextHit">WKRÓTCE!</h1>
      <ul className="films">
        {upcoming.map((film, idx) => (
          <img src={film.src} alt={film.name} key={idx} />
        ))}
      </ul>
    </div>
  );
}
