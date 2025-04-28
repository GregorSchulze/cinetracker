import React from "react";
import "./index.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router";
import { MovieProvider } from "./context/MovieContext";

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
        </div>
      </MovieProvider>
    </>
  );
}

export default App;
