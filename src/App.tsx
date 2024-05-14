import { useState } from "react";
import NewNavbar from "./components/NowyNavbar/NewNavbar.tsx";
import MainPage from "./components/MainPage/MainPage.tsx";
import Repertuar from "./components/Repertuar/Repertuar.tsx";
import Login from "./components/Login/Login.tsx";
import Register from "./components/Register/Register.tsx";
import SalaKinowa from "./components/SalaKinowa/SalaKinowa.tsx";
import Koszyk from "./components/Koszyk/Koszyk.tsx";
import { Routes, Route } from "react-router-dom";

interface MiejsceRezerwacji {
  cenaBiletu: number;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zarezerwowaneMiejsca, setZarezerwowaneMiejsca] = useState<
    MiejsceRezerwacji[]
  >([]);
  const [cenaBiletu, setCenaBiletu] = useState(0);

  function showModal() {
    setIsModalOpen(true);
  }

  function hideModal() {
    setIsModalOpen(false);
  }

  function handlePotwierdzRezerwacje(
    zarezerwowaneMiejsca: MiejsceRezerwacji[],
  ) {
    const cena = zarezerwowaneMiejsca.length * 20;
    setCenaBiletu(cena);
    setZarezerwowaneMiejsca(zarezerwowaneMiejsca);
  }
  return (
    <>
      <NewNavbar
        onButtonClick={showModal}
        isModalOpen={isModalOpen}
        hideModal={hideModal}
      />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/repertuar" element={<Repertuar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/salakinowa"
          element={
            <SalaKinowa
              iloscMiejsc={25}
              onPotwierdzRezerwacje={handlePotwierdzRezerwacje}
            />
          }
        />
        <Route
          path="/koszyk"
          element={
            <Koszyk
              zarezerwowaneMiejsca={zarezerwowaneMiejsca}
              cenaBiletu={cenaBiletu}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
