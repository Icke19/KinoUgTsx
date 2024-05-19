import "./PriceList.css";

// Define the interface for the component's props
interface PriceListProps {
  isOpen: boolean;
  onClose: () => void; // Assuming onClose is a function that takes no parameters and returns nothing
}

function PriceList({ isOpen, onClose }: PriceListProps) {
  console.log(isOpen);
  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "50%",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              position: "relative",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "18px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <h2>Drodzy użytkownicy</h2>
            <p>
              Ceny biletów w naszym kinie wynoszą dla wszystkich klientów 15zł.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PriceList;
