import "./index.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router";
import { MovieProvider, useMovieContext } from "./context/MovieContext";
import ModalTrailer from "./components/ModalTrailer";

// Separate Komponente, um den Context zu nutzen
const GlobalModal = () => {
  const { showModal, selectedMovie, closeModal } = useMovieContext();

  // Modal rendern wenn es geöffnet ist und ein Film ausgewählt wurde
  if (showModal && selectedMovie) {
    return <ModalTrailer movie={selectedMovie} onClose={closeModal} />;
  }
  return null;
};

function App() {
  return (
    <>
      <MovieProvider>
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
          <div className="max-w-[1400px] mx-auto">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
          <GlobalModal />
        </div>
      </MovieProvider>
    </>
  );
}

export default App;
