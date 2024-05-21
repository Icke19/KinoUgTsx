import { useState } from "react";
import NewNavbar from "./components/NowyNavbar/NewNavbar.tsx";
import MainPage from "./components/MainPage/MainPage.tsx";
import Repertuar from "./components/Repertuar/Repertuar.tsx";
import Login from "./components/Login/Login.tsx";
import Register from "./components/Register/Register.tsx";
import SalaKinowa from "./components/SalaKinowa/SalaKinowa.tsx";
import Koszyk from "./components/Koszyk/Koszyk.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Profil from "./components/Profil/Profil.tsx";
import Hall from "./components/Hall/Hall.tsx";

const PrivateRoute: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [zarezerwowaneMiejsca, setZarezerwowaneMiejsca] = useState<number[]>(
  //   [],
  // );

  // const [cenaBiletu, setCenaBiletu] = useState<number>(0);

  function showModal() {
    setIsModalOpen(true);
  }

  function hideModal() {
    setIsModalOpen(false);
  }

  // function handlePotwierdzRezerwacje(zarezerwowaneMiejsca: number[]) {
  //   const cena = zarezerwowaneMiejsca.length * 20; // Assuming each seat costs 20
  //   setCenaBiletu(cena);
  //   setZarezerwowaneMiejsca(zarezerwowaneMiejsca);
  // }

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
          path="/salakinowa/:id"
          element={<PrivateRoute component={SalaKinowa} />}
        />
        <Route path="/koszyk" element={<PrivateRoute component={Koszyk} />} />
        <Route path="/hall" element={<Hall />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </>
  );
}

export default App;
