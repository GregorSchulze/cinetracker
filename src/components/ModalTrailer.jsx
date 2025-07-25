// src/components/ModalTrailer.jsx
import React, { useState, useEffect } from "react";
// WICHTIG: Stelle sicher, dass getMovieDetails in deiner api.js existiert und das gesamte Detailobjekt zurückgibt!
// Falls du sie getMovieLength genannt hast und sie nur die runtime zurückgibt,
// dann musst du hier 'getMovieLength' importieren und die Logik anpassen.
import { getMovieDetails, getMovieVideos } from "../services/api";
import { IoClose } from "react-icons/io5";

function ModalTrailer({ movie, onClose }) {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const [trailerError, setTrailerError] = useState(null);

  const [movieDetails, setMovieDetails] = useState(null); // Speichert das gesamte Detailobjekt
  const [loadingDetails, setLoadingDetails] = useState(true); // Ladezustand für Filmdetails
  const [detailsError, setDetailsError] = useState(null); // Fehlerzustand für Filmdetails

  // Einzelner useEffect für alle API-Abrufe beim Öffnen des Modals
  useEffect(() => {
    if (!movie || !movie.id) {
      setTrailerError("Keine Film-ID verfügbar.");
      setLoadingTrailer(false);
      setDetailsError("Keine Film-ID verfügbar."); // Auch Details Fehler setzen
      setLoadingDetails(false);
      return;
    }

    // Funktion zum Abrufen des Trailers
    const fetchTrailer = async () => {
      setLoadingTrailer(true);
      setTrailerError(null);
      try {
        const videos = await getMovieVideos(movie.id);
        const trailer = videos.find(
          (vid) =>
            vid.site === "YouTube" && vid.type === "Trailer" && vid.official
        );

        if (trailer) {
          setTrailerUrl(
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`
          );
        } else {
          setTrailerUrl(null);
          setTrailerError("Kein offizieller Trailer gefunden.");
        }
      } catch (err) {
        setTrailerError("Fehler beim Laden des Trailers.");
        console.error("Error fetching trailer:", err);
      } finally {
        setLoadingTrailer(false);
      }
    };

    // Funktion zum Abrufen der Filmdetails (inkl. Runtime, etc.)
    const fetchMovieDetailsData = async () => {
      // Umbenennung zur Klarheit
      setLoadingDetails(true);
      setDetailsError(null);
      try {
        const details = await getMovieDetails(movie.id); // Hier den getMovieDetails Aufruf
        setMovieDetails(details);
      } catch (error) {
        setDetailsError("Fehler beim Laden der Filmdetails.");
        console.error("Error fetching movie details:", error);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchTrailer(); // Rufe Trailer-Funktion auf
    fetchMovieDetailsData(); // Rufe Details-Funktion auf
  }, [movie]); // Abhängigkeit von 'movie'

  // Schließen des Modals mit ESC-Taste (dieser useEffect ist korrekt)
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!movie) {
    return null;
  }

  // Formatierung der Bewertung
  const formatRating = (rating) => {
    return rating ? `${((rating / 10) * 5).toFixed(1)} / 5` : "N/A";
  };

  // Formatierung der Filmlänge
  const formatRuntime = (minutes) => {
    if (typeof minutes !== "number" || minutes <= 0) {
      return "N/A";
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let result = "";
    if (hours > 0) {
      result += `${hours}Std.`;
    }
    if (remainingMinutes > 0) {
      result += `${remainingMinutes}Min.`;
    }
    return result.trim();
  };

  // Gemeinsamer Lade-Zustand für beide API-Abrufe (Trailer und Details)
  if (loadingTrailer || loadingDetails) {
    return (
      <div
        tabIndex="-1"
        className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 overflow-y-auto p-4"
        onClick={onClose}
      >
        <div className="relative p-4 w-full max-w-4xl max-h-full bg-gray-800 rounded-lg shadow-lg text-white flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // Gemeinsamer Fehler-Zustand für beide API-Abrufe
  if (trailerError || detailsError) {
    return (
      <div
        tabIndex="-1"
        className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 overflow-y-auto p-4"
        onClick={onClose}
      >
        <div className="relative p-4 w-full max-w-4xl max-h-full bg-gray-800 rounded-lg shadow-lg text-red-400 flex items-center justify-center h-64">
          {trailerError ? trailerError : detailsError}
        </div>
      </div>
    );
  }

  return (
    <div
      tabIndex="-1"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/80  overflow-y-auto p-4"
      onClick={onClose}
    >
      <div
        className="relative p-4 w-full max-w-4xl max-h-full bg-gray-800 rounded-lg shadow-lg text-white"
        onClick={(e) => e.stopPropagation()} // Klick im Modal schließt es nicht
      >
        {/* Close Button oben rechts */}
        <button
          type="button"
          className="absolute top-3 end-3 text-gray-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-lg text-sm p-1.5 inline-flex items-center"
          onClick={onClose}
        >
          <IoClose className="w-5 h-5" />
          <span className="sr-only">Close modal</span>
        </button>

        <div className="p-4 md:p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">{movie.title}</h2>

          {/* Trailer-Bereich */}
          <div className="mb-6 aspect-w-16 aspect-h-9 w-full">
            {trailerUrl ? ( // Direkt den Trailer anzeigen, wenn URL da ist
              <iframe
                className="aspect-video rounded-lg"
                src={trailerUrl}
                title={`Trailer for ${movie.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              // Wenn kein Trailer-URL, dann "Kein Trailer verfügbar."
              <div className="flex items-center justify-center h-48 bg-gray-700 rounded-lg">
                Kein Trailer verfügbar.
              </div>
            )}
          </div>

          {/* Film-Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-semibold mb-2">Beschreibung:</h4>
              <p className="text-gray-300 text-base">
                {movieDetails?.overview ||
                  movie.overview ||
                  "Keine Beschreibung verfügbar."}
                {/* Bevorzugt movieDetails.overview, fällt zurück auf movie.overview oder Standardtext */}
              </p>
            </div>
            {/* NEU: Filmlänge separat anzeigen, korrekt geschachtelt */}
            {movieDetails?.runtime > 0 && (
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-semibold">Laufzeit:</h4>
                <p className="text-lg font-bold text-gray-300">
                  {formatRuntime(movieDetails.runtime)}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold">Bewertung:</h4>
              <p className="text-lg font-bold text-yellow-400">
                {formatRating(movieDetails?.vote_average || movie.vote_average)}
                {/* Bevorzugt movieDetails.vote_average, fällt zurück auf movie.vote_average */}
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-300 hover:bg-gray-300 hover:text-blue-700 focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalTrailer;
