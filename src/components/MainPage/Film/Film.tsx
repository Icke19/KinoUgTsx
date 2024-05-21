import "./Film.css";
import axios from "axios";
import { useEffect, useState } from "react";

// Interfaces are already defined appropriately for the types of data the component expects.
interface Film {
  id: number; // assuming id is a number
  name: string;
  src: string;
  alt: string;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ImageUrl {
  src: string;
  alt: string;
}

export default function Film() {
  const [hits, setHits] = useState<ImageUrl[]>([]);
  // const [upcoming, setUpcoming] = useState<ImageUrl[]>([]);

  const fetchImagesByIds = async (ids: number[]) => {
    try {
      const response = await axios.get<Movie[]>(
        `https://localhost:7204/api/Movie/GetMoviesByIds`,
        {
          params: { ids },
          paramsSerializer: (params) => {
            return Object.keys(params)
              .map((key) =>
                params[key].map((val: number) => `${key}=${val}`).join("&"),
              )
              .join("&");
          },
        },
      );
      console.log("Fetched movies:", response.data);
      const images = response.data.map((movie) => ({
        src: movie.image,
        alt: movie.title,
      }));
      console.log("Mapped images:", images);
      return images;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesByIds([7, 8, 9]);
      setHits(images);
      console.log("Set imageUrls:", images);
    };
    fetchImages();
  }, []);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const images = await fetchImagesByIds([14, 15, 16]);
  //     setUpcoming(images);
  //     console.log("Set imageUrls:", images);
  //   };
  //   fetchImages();
  // }, []);

  return (
    <div className="FilmMenu">
      <h1 className="TextHit">NAJWIĘKSZE HITY!</h1>
      <ul className="films">
        {hits.map((film, idx) => (
          <img src={film.src} alt={film.alt} key={idx} /> // Use unique id for key if available
        ))}
      </ul>
      {/*<h1 className="TextHit">WKRÓTCE!</h1>*/}
      {/*<ul className="films">*/}
      {/*  {upcoming.map((film, idx) => (*/}
      {/*    <img src={film.src} alt={film.alt} key={idx} /> // Use unique id for key if available*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
}
