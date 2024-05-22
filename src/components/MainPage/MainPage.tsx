import PriceList from "../PriceList/PriceList.tsx";
import ImageSlider from "./ImageSlider/ImageSlider.tsx";
import Film from "./Film/Film.tsx";

interface MainPageProps {
  isModalOpen?: boolean; // Optional prop with a default value
  hideModal?: () => void; // Optional prop with a default value
}

function MainPage({ isModalOpen = false, hideModal }: MainPageProps) {
  return (
    <div className="app">
      <PriceList isOpen={isModalOpen} onClose={hideModal || (() => {})} />
      <div
        style={{
          maxWidth: "2000px",
          width: "100%",
          maxHeight: "520px",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <ImageSlider />
      </div>
      <Film />
    </div>
  );
}

export default MainPage;
