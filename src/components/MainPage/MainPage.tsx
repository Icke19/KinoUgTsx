import PriceList from "../PriceList/PriceList.tsx";
import ImageSlider from "./ImageSlider/ImageSlider.tsx";
import Film from "./Film/Film.tsx";
import { hits } from "../../data/hitsData.json";
import { upcoming } from "../../data/upcomingData.json";
import { slides } from "../../data/carouselData.json";

// Define an interface for the component props
interface MainPageProps {
  isModalOpen?: boolean; // Optional prop with a default value
  hideModal?: () => void; // Optional prop with a default value
}

// Assuming hits and upcoming are imported as arrays of { src: string; alt: string; }
function MainPage({ isModalOpen = false, hideModal }: MainPageProps) {
  const modifiedHits = hits.map((hit, index) => ({
    ...hit,
    id: index, // Just an example, ideally you should have meaningful IDs
    name: `Hit ${index}`, // Placeholder name, adjust as necessary
  }));
  const modifiedUpcoming = upcoming.map((up, index) => ({
    ...up,
    id: index,
    name: `Upcoming ${index}`,
  }));

  return (
    <div className="app">
      <PriceList isOpen={isModalOpen} onClose={hideModal || (() => {})} />
      <div
        style={{
          maxWidth: "2000px",
          width: "100%",
          height: "486px",
          margin: "0 auto",
        }}
      >
        <ImageSlider imageUrls={slides} />
      </div>
      <Film hits={modifiedHits} upcoming={modifiedUpcoming} />
    </div>
  );
}

export default MainPage;
