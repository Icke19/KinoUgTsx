import { useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight, CircleDot, Circle } from "lucide-react";
import "./ImageSlider.css";

interface ImageUrl {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  imageUrls: ImageUrl[];
}

function ImageSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === imageUrls.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return imageUrls.length - 1;
      return index - 1;
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((index) =>
        index === imageUrls.length - 1 ? 0 : index + 1,
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [imageUrls.length, imageIndex]); // Added dependencies to useEffect to optimize re-render

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {imageUrls.map((url, index) => (
          <img
            src={url.src}
            alt={url.alt}
            key={index}
            className="img-slider"
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
      >
        <ArrowBigLeft />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
      >
        <ArrowBigRight />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {imageUrls.map((_, index) => (
          <button
            className="img-slider-dot"
            key={index}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? <CircleDot /> : <Circle />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
