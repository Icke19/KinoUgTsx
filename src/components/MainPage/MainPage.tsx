import PriceList from "../PriceList/PriceList.tsx";
import ImageSlider from "./ImageSlider/ImageSlider.tsx";
import Film from "./Film/Film.tsx";
import { hits } from "../../data/hitsData.json";
import { upcoming } from "../../data/upcomingData.json";
import { slides } from "../../data/carouselData.json";

function MainPage({ isModalOpen = false, hideModal = true }) {
  return (
    <div className="app">
      <PriceList isOpen={isModalOpen} onClose={hideModal} />

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
      <Film hits={hits} upcoming={upcoming} />
    </div>
  );
}

export default MainPage;
