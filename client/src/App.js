import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Card from "./Components/Card";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/NewRecipe" element={<Create />} />
          <Route path="/Recipe/:id" element={<Card />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
