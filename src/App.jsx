import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Searching from "./Pages/Searching";
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
         <Route path="/searching" element={<Searching />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;