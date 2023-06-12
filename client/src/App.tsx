import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
