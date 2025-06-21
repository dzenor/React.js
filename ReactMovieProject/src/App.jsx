import "./css/App.css";
import "./components/MovieCard";
import Home from "./pages/Home";
import MovieCard from "./components/MovieCard";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";

function App() {
  const movieNumber = 2;

  return (
    <div>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </MovieProvider>
    </div>
  );
}

export default App;
