import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/signin" element={<Signin></Signin>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
