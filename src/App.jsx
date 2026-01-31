import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sorting from "./Pages/Sorting";
import Home from "./Pages/Home"
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Navbar />   {/* Persistent */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<Sorting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;